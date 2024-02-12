<script>
import axios from "axios";

export default {
  data() {
    return {
      currentBook: "",
      libraryAPI: "http://127.0.0.1:8000/api/library/",
    };
  },

  methods: {
    saveBook(bookId) {
      var userId = this.$cookies.get("userSession");

      axios
        .post(this.libraryAPI, {
          userId: userId,
          bookId: bookId,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    removeBook(bookId) {
      const userId = this.$cookies.get("userSession");

      axios.delete(this.libraryAPI + userId + "/" + bookId).then((response) => {
        console.log(response);
      });
    },
  },

  props: ["bookData"],
  mounted() {
    axios.get("http://127.0.0.1:8000/api/books/" + this.$route.params.bookId).then((response) => {
      this.currentBook = response.data;

      if (this.currentBook.google_id) {
        axios.get("https://www.googleapis.com/books/v1/volumes/" + this.currentBook.google_id).then((gResponse) => {
          var volumeInfo = gResponse.data.volumeInfo;

          this.currentBook.title = volumeInfo.title;
          this.currentBook.author = volumeInfo.authors.toString();
          this.currentBook.isbn = volumeInfo.industryIdentifiers[1].identifier;
          this.currentBook.plot = volumeInfo.description;
        });
      }
    });
  },
};
</script>

<template>
  <!-- book title and author -->
  <h2 class="mt-4 me-1 d-inline">{{ this.currentBook.title }}</h2>
  <h5 class="d-inline">| {{ this.currentBook.author }}</h5>

  <!-- save, remove book and reads -->
  <div>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-primary" @click="saveBook(this.currentBook.id)">Salva</button>
      <button type="button" class="btn btn-danger" @click="removeBook(this.currentBook.id)">Rimuovi</button>
    </div>

    <h6 class="d-inline">
      | Letto <strong>{{ this.currentBook.reads }}</strong>
      <span v-if="this.currentBook.reads > 1 || this.currentBook.reads == 0"> volte</span>
      <span v-else> volta</span>
    </h6>
  </div>

  <!-- plot -->
  <hr />
  <p v-html="this.currentBook.plot"></p>
</template>

<style lang="scoped"></style>
