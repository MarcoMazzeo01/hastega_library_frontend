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

  <div class="container-xl">
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
