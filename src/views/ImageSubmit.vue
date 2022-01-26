<template>
  <div class="container">
    <div class="image-container">
      <ImageInput />
    </div>
  </div>
</template>

<script>
import ImageInput from "../components/ImageInput.vue";

export default {
  components: {
    ImageInput,
  },
};
</script>

<style scoped>
.container {
  padding-top: 45px;
  display: block;
  height: 650px;
}
</style>
