<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Utenti",
      users: "",
    };
  },

  // components: {
  //   MyComponent,
  // },

  mounted() {
    axios.get("http://127.0.0.1:8000/api/users").then((response) => {
      this.users = response.data;
      console.log(this.users);
    });
  },
};
</script>

<template>
  <h1>{{ title }}</h1>

  <ul v-for="user in this.users">
    <li>
      <router-link :to="{ name: 'library', params: { userId: user.id } }"
        >{{ user.first_name }} {{ user.last_name }}</router-link
      >
    </li>
  </ul>
</template>

<style lang="scoped"></style>
