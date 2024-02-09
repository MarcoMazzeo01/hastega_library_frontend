<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  data() {
    return {};
  },

  components: {
    HelloWorld,
  },
};
</script>

<template>
  <!-- <HelloWorld msg="Hello" /> -->
  <router-link to="/explore">esplora</router-link> |
  <router-link to="/">users</router-link> |
  <router-link to="/newbook">nuovo libro</router-link>
  <router-view></router-view>
</template>

<style lang="scss"></style>
