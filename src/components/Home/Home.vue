<template>
  <Navbar />
  <div class="container">
    <router-link :to="{ name: 'Profile' }" exact class="text-decoration-none">
      <h4 class="text-end text-capitalize mb-4">welcome {{ userName }}</h4>
    </router-link>
    <div class="d-flex justify-content-between">
      <router-link :to="{ name: 'AddNewRest' }">
        <button type="button" class="btn btn-primary">
          Add new Restaurant
        </button>
      </router-link>
      <router-link :to="{ name: 'DeleteAll' }">
        <button type="button" class="btn btn-danger">Delete All</button>
      </router-link>
    </div>

    <UserRest :allRest="listoflocation"></UserRest>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Navbar from "@/components/Navbar/Navbar.vue";
import UserRest from "@/components/AddNewRest/UserRest.vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    Navbar,
    UserRest,
  },
  data() {
    return {
      userName: "",
      listoflocation: [],
      userId: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-data");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userName = JSON.parse(user).name;
      this.userId = JSON.parse(user).id;
    }
    let result = await axios.get(
      `http://localhost:3000/Location?userId=${this.userId}`
    );
    if (result.status == 200 && result.data.length > 0) {
      this.listoflocation = result.data;
      // console.log(result.data);
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
<style lang=""></style>
