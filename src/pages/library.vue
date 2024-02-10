<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Libreria",
      books: "",
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
    const userIdCookie = this.$cookies.get("userSession");
    const userIdParam = this.$route.params.userId;

    //redirect to /users page if user isn't logged
    if (userIdCookie === null) {
      this.$router.push({ path: "/" });
      return;
    }

    //redirect user to own library if attempting to check another user's library
    if (userIdCookie !== userIdParam) {
      this.$router.push({ path: `/library/${userIdCookie}` });
    }

    //api call to fetch users library
    axios
      .get("http://127.0.0.1:8000/api/users/" + userIdParam)
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

      <button @click="saveBook(book.id)">Aggiungi a libreria</button>

      <br />
      {{ book.author }}<br />
      {{ book.isbn }}<br />
      {{ book.plot }}
    </li>
  </ul>
</template>

<style lang="scoped"></style>
