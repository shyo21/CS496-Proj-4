<template>
  <!-- <div class="imgItem" v-for="(img, index) in imgs" :key="index">
    <img class="image" :src="img.url" :alt="img.alt" />
  </div> -->
  <div class="templateCont">
    <div class="contImg0">
      <div class="img_0">
        <img :src="this.img_0" alt="img_0" />
      </div>
      <div class="idea_1">
        {{ this.productDetail["des_idea_1"] }}
      </div>
      <div class="detail_1">
        {{ this.productDetail["des_detail_1"] }}
      </div>
    </div>

    <div class="contImg1">
      <div class="img_1">
        <img :src="this.img_1" alt="img_1" />
      </div>
      <div class="idea_2">
        {{ this.productDetail["des_idea_2"] }}
      </div>
      <div class="detail_2">
        {{ this.productDetail["des_detail_2"] }}
      </div>
    </div>

    <div class="contImg2">
      <div class="img_2">
        <img :src="this.img_2" alt="img_2" />
      </div>
      <div class="idea_3">
        {{ this.productDetail["des_idea_3"] }}
      </div>
      <div class="detail_3">
        {{ this.productDetail["des_detail_3"] }}
      </div>
    </div>

    <div class="price">
      {{ this.productDetail["price"] }}
    </div>
    <div class="type">
      {{ this.productDetail["product_type"] }}
    </div>
    <div class="submitCont">
      <button class="nextButton" @click="buyHandler">
        <span>Buy</span>
      </button>
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
      img_0: null,
      img_1: null,
      img_2: null,
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
      this.img_0 = "data:image/;base64," + this.imgFile;
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
      this.img_1 = "data:image/;base64," + this.imgFile;
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
      this.img_2 = "data:image/;base64," + this.imgFile;
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
.templateCont {
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
}
.idea_1 {
  font-size: 100px;
  font-weight: 800;
  margin-top: 200px;
}
.idea_2 {
  font-size: 100px;
  font-weight: 800;
  margin-top: 200px;
}
.idea_3 {
  font-size: 100px;
  font-weight: 800;
  margin-top: 200px;
}
.detail_1 {
  font-size: 50px;
  font-weight: 500;

  margin-bottom: 200px;
}
.detail_2 {
  font-size: 50px;
  font-weight: 500;

  margin-bottom: 200px;
}
.detail_3 {
  font-size: 50px;
  font-weight: 500;

  margin-bottom: 200px;
}

.price {
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 200px;
}
.type {
  font-size: 50px;
  font-weight: 500;
  margin-bottom: 200px;
}

.submitCont {
  margin-bottom: 100px;
  margin-left: 1200px;
}
.nextButton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #ff5c5c;
  color: #ffffff;

  margin: 0 50px 0 0;
  padding: 0.7rem 5rem;
  height: auto;

  font-size: 3rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 20px;

  display: inline-block;
  flex-basis: 10rem;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  cursor: pointer;

  transition: 0.5s;
}
.nextButton:active,
.nextButton:hover {
  background: #ff7a7a;
  outline: 0;
  flex-basis: 11rem;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.nextButton:disabled {
  opacity: 0.5;
}
.nextButton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: #ffffff;
}

.nextButton span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.nextButton:hover span {
  padding-right: 25px;
}

.nextButton:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
