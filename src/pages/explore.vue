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
  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <h1>{{ title }}</h1>

  <div class="row row-cols-1 row-cols-md-3 g-4">
    <div class="col" v-for="book in this.response">
      <div class="card">
        <!-- <img src="..." class="card-img-top" alt="..." /> -->
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">{{ book.author }}</h6>
          <p class="card-text" v-html="book.plot"></p>
          <a :href="`/book/${book.id}`" class="btn btn-primary">Scopri di più</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
