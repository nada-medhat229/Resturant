<template>
  <div class="log-regist align-items-center d-flex">
    <div class="container">
      <div class="w-50 m-auto">
        <form action="" @click.prevent>
          <div class="row align-items-center">
            <h5 class="text-center pb-3">Sign Up</h5>
            <div class="col-auto d-block w-100 mx-auto">
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
            <div class="col-auto w-100 d-block mx-auto">
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
            <div class="col-auto w-100 d-block mx-auto">
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
              <button
                type="submit"
                @click="redirectTo({ val: 'Login' })"
                class="btn btn-login"
              >
                Login</button
              >&nbsp;&nbsp;&nbsp;
              <button type="submit" @click="signUpNow()" class="btn btn-sign">
                Sign Up</button
              >&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "SignUp",
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
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
      this.redirectTo({ val: "Home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    // function redirect to page
    // loginpage() {
    //   this.$router.push({ name: "Login" });
    // },
    async signUpNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("success");
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        if (result.status == 201) {
          console.log("added user success");
          // saved user data in localstorage
          localStorage.setItem("user-data", JSON.stringify(result.data));
          console.log(JSON.stringify(result.data));
          // redirect page
          this.redirectTo({ val: "Home" });
        } else {
          console.log("can't adding user");
        }
      } else {
        console.log("error");
      }
    },
  },
};
</script>
<style scoped lang="scss">
.log-regist {
  background: #fccb80;
  height: 100vh;
  & form {
    border: 1px solid #662e26;
    border-radius: 6px;
    padding: 50px;
    accent-color: #f77b7b;
    color: #662e26;
    & .btn {
      width: 150px;
      color: #fff;
      padding: 8px;
    }
    & .btn-login {
      background-color: #662e26;
    }
    & .btn-sign {
      background-color: #f77b7b;
    }
  }
}
input {
  margin-bottom: 5px;
}
.error {
  color: red;
}
</style>
