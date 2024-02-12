<script>
import axios from "axios";
import BookCard from "../components/BookCard.vue";

export default {
  data() {
    return {
      title: "Libreria",
      books: "",
      libraryAPI: "http://127.0.0.1:8000/api/library/",
    };
  },

  components: {
    BookCard,
  },

  methods: {
    saveBook(bookId) {
      const userId = this.$cookies.get("userSession");

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
      const userId = this.$route.params.userId;

      axios.delete(this.libraryAPI + userId + "/" + bookId).then((response) => {
        console.log(response);
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
    axios.get("http://127.0.0.1:8000/api/users/" + userIdParam).then((response) => {
      this.books = response.data.books;
      console.log(this.books);

      this.books.forEach((element) => {
        if (element.google_id) {
          axios.get("https://www.googleapis.com/books/v1/volumes/" + element.google_id).then((gResponse) => {
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

  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="book in this.books">
      <BookCard :bookData="book"></BookCard>
    </div>
  </div>
</template>

<style lang="scoped"></style>
