<template lang="">
  <div class="container">
    <Navbar />

    <div class="w-75 m-auto mt-5">
      <h4 class="text-center pb-3">Update Restaurant</h4>
      <form action="" @click.prevent>
        <div class="row align-items-center">
          <div class="col-auto d-block w-100 mx-auto">
            <input
              type="text"
              class="form-control"
              placeholder="enter your name"
              v-model="state.name"
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
              type="tel"
              class="form-control"
              name="phone"
              placeholder="enter your phone"
              v-model="state.phone"
            />
            <span class="error" v-if="v$.phone.$error">{{
              v$.phone.$errors[0].$message
            }}</span>
          </div>
        </div>
        <br />
        <div class="row align-items-center">
          <div class="col-auto w-100 d-block mx-auto">
            <input
              type="text"
              class="form-control"
              placeholder="enter your address"
              v-model="state.address"
            />
            <span class="error" v-if="v$.address.$error">{{
              v$.address.$errors[0].$message
            }}</span>
          </div>
        </div>

        <div class="row">
          <div
            class="col-auto d-block mx-auto alert alert-success w-75 mt-3"
            v-if="successmessage.length > 0"
          >
            {{ successmessage }}
          </div>
          <div
            class="col-auto d-block mx-auto alert alert-danger w-75 mt-3"
            v-if="errormessage.length > 0"
          >
            {{ errormessage }}
          </div>
        </div>

        <button
          type="button"
          @click="updateresturant()"
          class="btn btn-success"
        >
          Update Now
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import Navbar from "@/components/Navbar/Navbar.vue";
import { minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { reactive, computed } from "vue";
import { mapActions } from "vuex";
export default {
  name: "UpdateRest",
  components: {
    Navbar,
  },
  setup() {
    const state = reactive({
      name: "",
      phone: "",
      address: "",
    });
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(10) },
        phone: { required, minLength: minLength(10) },
        address: { required, minLength: minLength(10) },
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
      resetId: "",
      userId: "",
      errormessage: "",
      successmessage: "",
      resturantData: [],
    };
  },
  mounted() {
    let user = localStorage.getItem("user-data");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.resetId = this.$route.params.resetId;
      this.cancurruntuserAcces();
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async cancurruntuserAcces() {
      let result = await axios.get(
        `http://localhost:3000/Location?id=${this.resetId}&userid=${this.userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.resturantData = result.data;
        this.state.name = this.resturantData[0].name;
        this.state.phone = this.resturantData[0].phone;
        this.state.address = this.resturantData[0].address;
      } else {
        this.redirectTo({ val: "Home" });
      }
    },
    async updateresturant() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.successmessage = "Good Job";
        let results = await axios.put(
          `http://localhost:3000/Location/${this.resetId}`,
          {
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            userId: this.userId,
          }
        );
        if (results.status == 200) {
          this.errormessage = "";
          this.successmessage = "Updated Resturant";
          setTimeout(() => {
            this.redirectTo({ val: "Home" });
          }, 2000);
        } else {
          this.successmessage = "";
          this.errormessage = "Faild";
        }
      } else {
        this.successmessage = "";
        this.errormessage = "Check Your Data All Feild Must Be Complete";
      }
    },
  },
};
</script>
<style scoped lang="scss">
input {
  margin-bottom: 5px;
}
.error {
  color: red;
}
</style>
