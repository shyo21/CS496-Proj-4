<template>
  <div class="container">
    <Signin />
    <!-- <Signup />
    <Pay /> -->
    <UserDetail />
  </div>
</template>

<script>
import Signin from "../components/Signin.vue";
import Signup from "../components/Signup.vue";
import Pay from "../components/Pay.vue";
import UserDetail from "../components/UserDetail.vue";
export default {
  components: {
    Signin,
    // Signup,
    // Pay,
    UserDetail,
  },
};
</script>
