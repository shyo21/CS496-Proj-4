<template>
  <div class="priceCont">
    <SetPriceVue />
  </div>
</template>

<script>
import SetPriceVue from "../components/SetPrice.vue";
export default {
  components: {
    SetPriceVue,
  },
};
</script>

<style scoped>
.priceCont {
  padding-top: 45px;
}
</style>
