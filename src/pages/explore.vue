<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Esplora",
      response: "",
    };
  },

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

  mounted() {
    axios.get("http://127.0.0.1:8000/api/books").then((response) => {
      this.response = response.data;

      this.response.forEach((element) => {
        if (element.google_id) {
          axios
            .get(
              "https://www.googleapis.com/books/v1/volumes/" + element.google_id
            )
            .then((gResponse) => {
              var volumeInfo = gResponse.data.volumeInfo;

              element.title = volumeInfo.title;
              element.author = volumeInfo.authors.toString();
              element.isbn = volumeInfo.industryIdentifiers[1].identifier;
              element.plot = volumeInfo.description;
            });
        }
      });
    });
  },
  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <h1>{{ title }}</h1>
  <ul v-for="book in this.response">
    <li>
      <router-link :to="{ name: 'book', params: { bookId: book.id } }">{{
        book.title
      }}</router-link>
      <button @click="saveBook(book.id)">Aggiungi a libreria</button>
      <br />
      {{ book.author }}<br />
      {{ book.isbn }}<br />
      {{ book.plot }}
    </li>
    <hr />
  </ul>
</template>

<style lang="scoped"></style>
