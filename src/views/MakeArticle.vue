<template>
  <div class="container">
    <OptionSelectorVue />
  </div>
</template>

<script>
import OptionSelectorVue from "../components/OptionSelector.vue";

export default {
  components: {
    OptionSelectorVue,
  },
};
</script>

<style scoped>
.container {
  padding-top: 30px;
}
</style>
