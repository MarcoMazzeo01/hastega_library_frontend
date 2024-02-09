<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Libreria",
      books: "",
    };
  },

  mounted() {
    axios
      .get("http://127.0.0.1:8000/api/users/" + this.$route.params.userId)
      .then((response) => {
        this.books = response.data.books;

        this.books.forEach((element) => {
          if (element.google_id) {
            axios
              .get(
                "https://www.googleapis.com/books/v1/volumes/" +
                  element.google_id
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
};
</script>

<template>
  <h1>{{ title }}</h1>
  <ul v-for="book in this.books">
    <li>
      <router-link :to="{ name: 'book', params: { bookId: book.id } }">{{
        book.title
      }}</router-link>
      <button @click="">Aggiungi a libreria</button>
      <br />
      {{ book.author }}<br />
      {{ book.isbn }}<br />
      {{ book.plot }}
    </li>
  </ul>
</template>

<style lang="scoped"></style>
