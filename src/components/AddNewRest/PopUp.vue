<template lang="">
  <!-- Modal -->
  <div Class="PopUp" v-show="(isModal = true)">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <slot name="headfordelete"></slot>
          </h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closing"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  emits: ["confirm", "cancel"],
  setup(props, context) {
    const closing = () => {
      context.emit("cancel");
    };
    return {
      closing,
    };
  },
};
</script>

<style lang="scss">
.PopUp .modal-dialog {
  background: #fff;
  width: 55%;
  max-width: 100%;
  margin-top: -25%;
  border-radius: 8px;
}
.modal-content {
  padding: 20px;
  overflow: overlay;
  height: 100%;
}
</style>
