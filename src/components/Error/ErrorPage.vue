<template>
  <div class="error">
    <h1 class="h">Error Page</h1>
    <section class="error-container">
      <span>4</span>
      <span><span class="screen-reader-text">0</span></span>
      <span>4</span>
    </section>
    <div class="h"><button @click="goback()">Back To Home</button></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "ErrorPage",
  methods: {
    ...mapActions(["redirectTo"]),

    goback() {
      this.redirectTo({ val: "Home" });
    },
  },
};
</script>
<style scoped lang="scss">
.error-container {
  text-align: center;
  font-size: 180px;
  font-family: "Catamaran", sans-serif;
  font-weight: 800;
  margin: 20px 15px;
}
.error-container > span {
  display: inline-block;
  line-height: 0.7;
  position: relative;
  color: #ffb485;
}
.error-container > span {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}
.error-container > span:nth-of-type(1) {
  color: #d1f2a5;
}
.error-container > span:nth-of-type(3) {
  color: #f56991;
}
.error-container > span:nth-of-type(2) {
  width: 120px;
  height: 120px;
  border-radius: 999px;
}
.error-container > span:nth-of-type(2):before,
.error-container > span:nth-of-type(2):after {
  border-radius: 0%;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 999px;
  box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
    inset 0 30px 0 rgba(239, 250, 180, 0.4),
    inset -30px 0 0 rgba(255, 196, 140, 0.4),
    inset 0 -30px 0 rgba(245, 105, 145, 0.4);
}
.error-container > span:nth-of-type(2):before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}

.screen-reader-text {
  position: absolute;
  top: -9999em;
  left: -9999em;
}
.h {
  text-align: center;
  margin: 30px 15px;
  button {
    border: none;
    background: transparent;
    color: #2c3e50;
    font-size: 25px;
    &:hover {
      cursor: pointer;
      color: #f56991;
    }
  }
}
</style>
