<template>
  <div class="AddNewRest">
    <div class="container">
      <Navbar />

      <div class="w-75 m-auto mt-5">
        <h4 class="text-center pb-3">Add New Restaurant</h4>
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

          <button type="button" @click="addlocation()" class="btn btn-primary">
            Save changes
          </button>
        </form>
      </div>
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
  name: "AddNewRest",
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
      userId: "",
      errormessage: "",
      successmessage: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-data");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async addlocation() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.successmessage = "Good Job";

        let result = await axios.post("http://localhost:3000/Location", {
          name: this.state.name,
          phone: this.state.phone,
          address: this.state.address,
          userId: this.userId,
        });
        if (result.status == 201) {
          this.errormessage = "";
          this.successmessage = "Thanks For You";
          setTimeout(() => {
            this.redirectTo({ val: "Home" });
            // this.state.name = "";
            // this.state.phone = "";
            // this.state.address = "";
            // this.successmessage = "";
            // this.v$.name.$errors[0].$message = "";
            // this.v$.phone.$errors[0].$message = "";
            // this.v$.address.$errors[0].$message = "";
          }, 2000);
        } else {
          this.successmessage = "";
          this.errormessage = "CHeck Your Data";
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
