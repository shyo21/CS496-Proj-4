<template>
  <div v-if="temp" class="learn">
    <Signin />
  </div>
  <div v-else class="learn">
    <UserDetail />
  </div>
</template>

<script>
import Signin from "../components/Signin.vue";
import VueCookies from "vue-cookies";
import UserDetail from "../components/UserDetail.vue";

export default {
  created() {
    let l = VueCookies.get("uid");
    this.temp = l == null;
  },
  components: {
    Signin,
    UserDetail,
  },
  methods: {},
};
</script>
