<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <div class="">
        <router-link :to="{ name: 'Home' }" exact>
          <img src="../../assets/hand-sign.png" alt="img-logo" class="logo" />
        </router-link>
      </div>
      <div @click="logout()" class="">
        <img src="../../assets/turn-off.png" alt="img" class="logout-img" />
      </div>
    </div>
  </nav>
</template>
<script>
import { mapActions } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navbar",
  methods: {
    ...mapActions(["redirectTo"]),
    logout() {
      localStorage.clear();
      this.redirectTo({ val: "Login" });
    },
  },
};
</script>
<style lang="scss">
.navbar {
  & .logo {
    width: 100px;
  }
  & .logout-img {
    width: 30px;
    cursor: pointer;
  }
}

nav {
  padding: 30px;
  font-size: 18px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
