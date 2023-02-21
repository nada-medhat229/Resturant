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
        <td>Delete|Update|View</td>
      </tr>
    </tbody>
  </table>
  <div class="alert alert-warning mt-5" role="alert" v-else>
    Not Any Resturant
  </div>
</template>
<script>
export default {
  name: "UserRest",
  props: ["allRest"],
};
</script>
<style lang=""></style>
