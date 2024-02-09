<script>
// import MyComponent from
export default {
  data() {
    return {
      title: "Nuovo Libro",
    };
  },

  // components: {
  //   MyComponent,
  // },
};
</script>

<template>
  <h1>{{ title }}</h1>

  <form action="http://127.0.0.1:8000/api/books/" method="POST">
    <!-- book title -->
    <label for="title" class="form-label">Titolo</label>
    <input type="text" class="form-control" id="title" name="title" />

    <!-- book author -->
    <label for="author" class="form-label">Autore</label>
    <input type="text" class="form-control" id="title" name="author" />

    <!-- book isbn -->
    <label for="isbn" class="form-label">Codice ISBN</label>
    <input type="text" class="form-control" id="isbn" name="isbn" />

    <!-- book plot -->
    <label for="plot" class="form-label">Trama</label>
    <textarea class="form-control" id="plot" name="plot" rows="4"></textarea>

    <button type="submit" class="btn btn-primary">Salva</button>
  </form>
</template>

<style lang="scoped"></style>
