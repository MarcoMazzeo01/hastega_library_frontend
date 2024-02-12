<script>
// import MyComponent from
export default {
  data() {
    return {
      title: "test",
    };
  },

  props: ["bookData"],
};
</script>

<template>
  <div class="card">
    <!-- <img src="..." class="card-img-top" alt="..." /> -->
    <div class="card-body">
      <h5 class="card-title">{{ bookData.title }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ bookData.author }}</h6>
      <p class="card-text" v-html="bookData.plot"></p>
      <a :href="`/book/${bookData.id}`" class="btn btn-primary">Scopri di più</a>
    </div>
  </div>
</template>

<style lang="scoped"></style>
