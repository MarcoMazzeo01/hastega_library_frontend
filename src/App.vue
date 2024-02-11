<script>
import Navbar from "./components/Navbar.vue";

export default {
  data() {
    return {};
  },

  components: {
    Navbar,
  },
};
</script>

<template>
  <Navbar></Navbar>
  <!-- <router-link to="/newbook">nuovo libro</router-link> -->

  <div class="container-xl">
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
