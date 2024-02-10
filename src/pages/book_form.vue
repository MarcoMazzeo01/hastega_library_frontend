<script>
import axios from "axios";

// import MyComponent from
export default {
  data() {
    return {
      title: "Nuovo Libro",
      formData: {
        title: "",
        author: "",
        isbn: "",
        plot: "",
      },
    };
  },

  methods: {
    async handleSubmit() {
      axios
        .post("http://127.0.0.1:8000/api/books/", this.formData)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const bookId = response.data.id;
            //this.$router.push('book', )
            this.$router.push({ path: `/book/${bookId}` });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <h1>{{ title }}</h1>

  <form @submit.prevent="handleSubmit">
    <!-- book title -->
    <label for="title" class="form-label">Titolo</label>
    <input
      v-model.lazy="this.formData.title"
      type="text"
      class="form-control"
      id="title"
      name="title"
    />

    <!-- book author -->
    <label for="author" class="form-label">Autore</label>
    <input
      v-model.lazy="this.formData.author"
      type="text"
      class="form-control"
      id="title"
      name="author"
    />

    <!-- book isbn -->
    <label for="isbn" class="form-label">Codice ISBN</label>
    <input
      v-model.lazy="this.formData.isbn"
      type="text"
      class="form-control"
      id="isbn"
      name="isbn"
    />

    <!-- book plot -->
    <label for="plot" class="form-label">Trama</label>
    <textarea
      v-model.lazy="this.formData.plot"
      class="form-control"
      id="plot"
      name="plot"
      rows="4"
    ></textarea>

    <button type="submit" class="btn btn-primary">Salva</button>
  </form>
</template>

<style lang="scoped"></style>
