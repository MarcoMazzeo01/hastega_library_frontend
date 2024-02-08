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
  <HelloWorld msg="Hello" />
  <p><router-link to="/library">library</router-link></p>
  <router-link to="/">users</router-link>
  <router-view></router-view>
</template>

<style lang="scss"></style>
