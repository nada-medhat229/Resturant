<template>
  <div class="log-regist align-items-center d-flex">
    <div class="container">
      <div class="w-50 m-auto">
        <form action="" @click.prevent>
          <h5 class="text-center">Login</h5>
          <br />
          <div class="row align-items-center">
            <div class="col-auto w-100 d-block mx-auto">
              <input
                type="email"
                class="form-control"
                placeholder="enter your email"
                v-model="state.email"
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
                v-model="state.password"
              />
              <span class="error" v-if="v$.password.$error">{{
                v$.password.$errors[0].$message
              }}</span>
            </div>
          </div>
          <br />
          <div class="row g-3 align-items-center">
            <div class="col-auto d-block mx-auto">
              <button type="submit" @click="loginhere()" class="btn btn-login">
                Login
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="submit"
                @click="redirectTo({ val: 'signup' })"
                class="btn btn-sign"
              >
                Sign UP
              </button>
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </form>
      </div>

      <div>{{ errormessage }}</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  setup() {
    const state = reactive({
      password: "",
      email: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        password: { required, minLength: minLength(10) },
      };
    });
    const v$ = useVuelidate(rules, state);
    return {
      v$,
      state,
    };
  },
  data() {
    return {
      errormessage: "",
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
    // signuppage() {
    //   this.$router.push({ name: "signup" });
    // },
    async loginhere() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("not error in validator");
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}&pass=${this.state.password}`
        );
        if (result.status == 200 && result.data.length > 0) {
          console.log("logged");
          // saved user data in localstorage
          localStorage.setItem("user-data", JSON.stringify(result.data[0]));
          console.log(JSON.stringify(result.data[0]));
          // redirect page
          this.redirectTo({ val: "Home" });
        } else {
          this.errormessage = "not found user";
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
