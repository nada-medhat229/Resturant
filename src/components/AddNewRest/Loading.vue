<template lang="">
  <div class="container">
    <Navbar />
    <img src="@/assets/spinner-of-dots.png" alt="" class="imageinfo" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar/Navbar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Loading",
  components: {
    Navbar,
  },
};
</script>
<style lang="scss" scoped>
.imageinfo {
  width: 120px;
  height: 120px;
  margin: auto;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
