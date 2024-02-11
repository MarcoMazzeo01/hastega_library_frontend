<script>
import axios from "axios";
import { store } from "../data/store";
export default {
  data() {
    return {
      users: store.users,
      currentUser: 0,
    };
  },

  methods: {
    login(userId) {
      this.$cookies.set("userSession", userId);
      this.$router.push({ path: `/library/${userId}` });
      this.currentUser = userId;
    },

    logout() {
      this.$cookies.remove("userSession");
      this.$router.push({ path: "/" });
    },
  },

  created() {
    this.currentUser = 0;
    axios.get("http://127.0.0.1:8000/api/users").then((response) => {
      store.users = response.data;
      this.users = store.users;
    });
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Hastega</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- profile -->
          <li class="nav-item">
            <router-link class="text-decoration-none" :to="{ name: 'library', params: { userId: this.currentUser } }"
              ><span class="nav-link" aria-current="page">Profilo</span></router-link
            >
          </li>

          <!-- explore -->
          <li class="nav-item">
            <a class="nav-link" href="/explore">Esplora</a>
          </li>

          <!-- users & logout -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Utenti </a>
            <ul class="dropdown-menu">
              <template v-for="user in this.users">
                <li>
                  <span class="dropdown-item" :class="user.id == this.currentUser ? 'text-decoration-underline' : ''" @click="login(user.id)">
                    {{ user.first_name }} {{ user.last_name }}</span
                  >
                </li>
              </template>

              <li><hr class="dropdown-divider" /></li>

              <!-- logout button -->
              <li>
                <span class="dropdown-item" @click="logout()">Logout</span>
              </li>
            </ul>
          </li>
        </ul>

        <!-- search bar -->
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style lang="scoped"></style>
