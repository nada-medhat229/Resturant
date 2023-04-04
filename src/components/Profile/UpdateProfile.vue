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
        />
        <span class="error" v-if="v$.name.$error">{{
          v$.name.$errors[0].$message
        }}</span>
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
        />
        <span class="error" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message
        }}</span>
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
        />
        <span class="error" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message
        }}</span>
      </div>
    </div>
    <br />
    <div class="row align-items-center">
      <div class="col-auto d-block mx-auto">
        <button type="submit" @click="saveupdated()" class="btn btn-success">
          Update Profile</button
        >&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  </form>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdateProfile",
  components: {
    Navbar,
  },
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
      UserId: "",
    };
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(10) },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-data");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.password = JSON.parse(user).password;
      this.UserId = JSON.parse(user).id;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async saveupdated() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("validate");
        let result = await axios.put(
          `http://localhost:3000/users/${this.UserId}`,
          { name: this.name, email: this.email, password: this.password }
        );
        if (result.status == 200) {
          console.log("updated successfuly");
          localStorage.setItem("user-data", JSON.stringify(result.data));
          setTimeout(() => {
            this.redirectTo({ val: "Profile" });
          }, 100);
        } else {
          console.warn("updated faild");
        }
      } else {
        console.log("notValidate");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  margin-bottom: 5px;
}
.error {
  color: red;
}
</style>
