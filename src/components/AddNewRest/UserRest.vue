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
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="alert alert-warning mt-5" role="alert" v-else>
    Not Any Resturant
  </div>
  <PopUp>
    <headfordelete> text </headfordelete>
    <bodyfordelete>
      <form @click.prevent>
        <p>are you sure</p>
        <p>{{ name }}</p>
        <p>{{ address }}</p>
        <p>{{ phone }}</p>
      </form>
    </bodyfordelete>
  </PopUp>
</template>

<script>
import PopUp from "@/components/AddNewRest/PopUp.vue";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "UserRest",
  props: ["allRest"],
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
      deleteReset: [],
    };
  },
  mounted() {
    let user = localStorage.getItem("user-data");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userId = JSON.parse(user).id;
      this.deleteReset = this.$route.params.restid;
      this.cancurrentuserAcess();
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async cancurrentuserAcess() {
      let result = await axios.get(
        `http://localhost:3000/Location?id=${this.deleteReset}&userId=${this.userId}`
      );

      if (result.status == 200 && result.data.length > 0) {
        this.resetData = result.data;
        console.log(this.resetData);
        // this.name = resetData[0].name;
        // this.address = resetData[0].address;
        // this.phone = resetData[0].phone;
      } else {
        this.redirectTo({ val: "Home" });
      }
    },
  },
};
</script>
<style lang=""></style>
