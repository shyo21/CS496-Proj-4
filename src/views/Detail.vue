<template>
  <div class="templateContainer">
    <div class="imgItem" v-for="(img, index) in imgs" :key="index">
      <img class="image" :src="img.url" :alt="img.alt" />
    </div>
    <div class="idea_1">
      {{ this.productDetail["des_idea_1"] }}
    </div>
    <div class="detail_1">
      {{ this.productDetail["des_detail_1"] }}
    </div>
    <div class="idea_2">
      {{ this.productDetail["des_idea_2"] }}
    </div>
    <div class="detail_2">
      {{ this.productDetail["des_detail_2"] }}
    </div>
    <div class="idea_3">
      {{ this.productDetail["des_idea_3"] }}
    </div>
    <div class="detail_3">
      {{ this.productDetail["des_detail_3"] }}
    </div>
    <div class="price">
      {{ this.productDetail["price"] }}
    </div>
    <div class="type">
      {{ this.productDetail["product_type"] }}
    </div>
    <div class="buy">
      <button class="mainbutton" id="내구성" @click="buyHandler"></button>
    </div>
  </div>
</template>

<script>
import VueHorizontal from "vue-horizontal";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: {},
  created() {
    this.pid = VueCookies.get("cur_pid");
    this.getDetail(this.pid);
  },
  data() {
    return {
      pid: null,
      productDetail: null,
      imgFile: null,
      imgs: [],
      category: null,
      prices: null,
    };
  },
  methods: {
    getDetail: async function () {
      await axios
        .get("http://54.180.160.3:8080/product/confirm", {
          params: {
            pid: this.pid,
          },
        })
        .then((response) => {
          console.log(response);
          this.productDetail = response.data.data;
          console.log(this.productDetail);
        })
        .catch(function () {
          console.log("getProducts Failed");
        });
      this.getImg0(this.pid);
      this.getImg1(this.pid);
      this.getImg2(this.pid);
    },

    getImg0: async function (pid) {
      let formData = new FormData();
      formData.append("pid", pid);

      await axios
        .post("http://192.249.18.199:80/call_img_0", formData)
        .then((response) => {
          console.log(response);
          this.imgFile = response.data;
          console.log(this.imgFile);
        })
        .catch(function () {
          console.log("getImg Failed");
        });

      var imgJson = {};
      imgJson.url = "data:image/;base64," + this.imgFile;
      imgJson.alt = pid + "_0";
      this.imgs.push({ ...imgJson });
    },

    getImg1: async function (pid) {
      let formData = new FormData();
      formData.append("pid", pid);

      await axios
        .post("http://192.249.18.199:80/call_img_1", formData)
        .then((response) => {
          console.log(response);
          this.imgFile = response.data;
          console.log(this.imgFile);
        })
        .catch(function () {
          console.log("getImg Failed");
        });

      var imgJson = {};
      imgJson.url = "data:image/;base64," + this.imgFile;
      imgJson.alt = pid + "_1";
      this.imgs.push({ ...imgJson });
    },

    getImg2: async function (pid) {
      let formData = new FormData();
      formData.append("pid", pid);

      await axios
        .post("http://192.249.18.199:80/call_img_2", formData)
        .then((response) => {
          console.log(response);
          this.imgFile = response.data;
          console.log(this.imgFile);
        })
        .catch(function () {
          console.log("getImg Failed");
        });

      var imgJson = {};
      imgJson.url = "data:image/;base64," + this.imgFile;
      imgJson.alt = pid + "_2";
      this.imgs.push({ ...imgJson });
    },

    buyHandler(event) {
      VueCookies.set("buyer_uid", this.productDetail["uid"]);
      //router 지정
      this.$router.push("/");
    },
  },
};
</script>

<!-- Content Design -->
<style scoped>
.templateContainer {
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
}
</style>
