<template lang="">
  <table class="table mt-5" v-if="allRest.length > 0">
    <caption>
      List of Resturant ({{
        allRest.length
      }})
    </caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rest, i) in allRest" :key="i">
        <th scope="row">{{ rest.name }}</th>
        <td>{{ rest.phone }}</td>
        <td>{{ rest.address }}</td>
        <td>
          <!-- <router-link
            :to="{ name: 'DeleteReset', params: { resetId: rest.id } }"
          >
            <button class="btn btn-danger">Delete</button>
          </router-link> -->

          <button type="button" class="btn btn-danger" @click="showmodal(rest)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="alert alert-warning mt-5" role="alert" v-else>
    Not Any Resturant
  </div>
  <PopUp v-show="isModal" @cancel="Closing()">
    <template #headfordelete> Restaurant ({{ userId }}) </template>
    <div class="row">
      <form @click.prevent>
        <p>are you sure</p>
        <p>{{ name }}</p>
        <p>{{ address }}</p>
        <p>{{ phone }}</p>
        <button @click="deleteReset(userId)" class="btn btn-danger">
          Yes|Delete
        </button>
      </form>
    </div>
  </PopUp>
  <div
    class="alert alert-danger mt-5"
    role="alert"
    v-if="alertMessageSuccess.length > 0"
  >
    {{ alertMessageSuccess }}
  </div>
  <div
    class="alert alert-warning mt-5"
    role="alert"
    v-if="alertMessageproblem.length > 0"
  >
    {{ alertMessageproblem }}
  </div>
</template>

<script>
import PopUp from "@/components/AddNewRest/PopUp.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "UserRest",
  props: {
    allRest: {
      type: Array,
    },
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PopUp,
  },
  data() {
    return {
      name: "",
      address: "",
      phone: "",
      resetData: "",
      userId: "",
      isModal: false,
      alertMessageSuccess: "",
      alertMessageproblem: "",
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["redirectTo"]),
    showmodal(i) {
      (this.isModal = true), (this.userId = i.id);
      (this.name = i.name), (this.address = i.address), (this.phone = i.phone);
    },
    Closing() {
      this.isModal = false;
    },
    async deleteReset(userId) {
      let result = await axios.delete(
        `http://localhost:3000/Location/${userId}`
      );
      if (result.status == 200) {
        this.redirectTo({ val: "Loading" });
        setTimeout(() => {
          this.alertMessageSuccess = "Deleted";
          this.alertMessageproblem = "";
          this.isModal = false;
          this.redirectTo({ val: "Home" });
        }, 500);
      } else {
        this.alertMessageSuccess = "";
        this.alertMessageproblem = "Try Agin , Some Problem";
      }
    },
  },
};
</script>
<style lang=""></style>
