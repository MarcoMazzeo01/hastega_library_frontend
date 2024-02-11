<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "Libro",
      currentBook: "",
    };
  },

  // components: {
  //   MyComponent,
  // },

  methods: {
    saveBook(bookId) {
      var userId = this.$cookies.get("userSession");

      axios
        .post("http://127.0.0.1:8000/api/library", {
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
  <h1>{{ title }}</h1>
  <h3>{{ this.currentBook.title }}</h3>
  <button @click="saveBook(this.currentBook.id)">Aggiungi a libreria</button>
  {{ this.currentBook.author }} -
  <span
    >Letto {{ this.currentBook.reads }}
    <span v-if="this.currentBook.reads > 1 || this.currentBook.reads == 0">volte</span>
    <span v-else>volta</span>
  </span>
  <p v-html="this.currentBook.plot"></p>
</template>

<style lang="scoped"></style>
