<template lang="">
  <Navbar />
  <form action="" @click.prevent>
    <div class="row align-items-center">
      <h5 class="text-center">Profile Update</h5>
      <div class="col-auto d-block mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="enter your name"
          v-model="name"
          disabled
        />
      </div>
    </div>
    <br />
    <div class="row align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="email"
          class="form-control"
          name="email"
          placeholder="enter your email"
          v-model="email"
          disabled
        />
      </div>
    </div>
    <br />
    <div class="row align-items-center">
      <div class="col-auto d-block mx-auto">
        <input
          type="password"
          class="form-control"
          placeholder="enter your password"
          v-model="password"
          disabled
        />
      </div>
    </div>
    <br />
    <div class="row align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="submit" @click="updateProfile()" class="btn btn-success">
          Update Profile</button
        >&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  </form>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import { mapActions } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  components: {
    Navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-data");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.password = JSON.parse(user).password;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    updateProfile() {
      this.redirectTo({ val: "UpdateProfile" });
    },
  },
};
</script>
<style lang=""></style>
