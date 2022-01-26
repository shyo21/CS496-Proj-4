<template>
  <div class="priceinnerCont">
    <div class="priceTitle">Money Money Money</div>
    <input class="inputPrice" v-model="message" placeholder="how much?" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.priceTitle {
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
  font-size: 100px;
  font-weight: 700;

  text-align: center;
  padding: 100px 150px 50px 150px;
}
.inputPrice {
  position: relative;
  width: 300px;
  left: 40%;
  height: 50px;
  font-size: 30px;
  text-align: center;
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
}
</style>
