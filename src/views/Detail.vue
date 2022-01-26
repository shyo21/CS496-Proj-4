<template>
  <!-- <div class="imgItem" v-for="(img, index) in imgs" :key="index">
    <img class="image" :src="img.url" :alt="img.alt" />
  </div> -->
  <div class="img_0">
    <img :src="this.img_0" alt="img_0" />
  </div>
  <div class="img_1">
    <img :src="this.img_1" alt="img_1" />
  </div>
  <div class="img_2">
    <img :src="this.img_2" alt="img_2" />
  </div>
  <div class="idea_1">
    {{ this.productDetail["des_idea_1"] }}
  </div>
  <div class="idea_2">
    {{ this.productDetail["des_idea_2"] }}
  </div>
  <div class="idea_3">
    {{ this.productDetail["des_idea_3"] }}
  </div>
  <div class="detail_1">
    {{ this.productDetail["des_detail_1"] }}
  </div>
  <div class="detail_2">
    {{ this.productDetail["des_detail_2"] }}
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
.header {
  padding-top: 20px;
}
.card {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}

.content {
  padding: 12px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  color: #333333;
}

.brand .icon {
  flex-shrink: 0;
  height: 20px;
  width: 20px;
  fill: currentColor;
}

.brand .name {
  margin-left: 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
}

.title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  margin-top: 8px;
  margin-bottom: 8px;
}

.date {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}
</style>

<!-- Parent CSS (Container) -->
<style scoped>
.header {
  margin-bottom: 16px;
}

main {
  padding: 24px;
}

@media (min-width: 768px) {
  main {
    padding: 48px;
  }
}
</style>

<!-- Responsive Breakpoints -->
<style scoped>
.horizontal {
  --count: 1;
  --gap: 16px;
  --margin: 24px;
}

@media (min-width: 640px) {
  .horizontal {
    --count: 2;
  }
}

@media (min-width: 768px) {
  .horizontal {
    --count: 3;
    --margin: 0;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 4;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --gap: 24px;
    --count: 6;
  }
}
</style>

<!--
## Responsive Logic
The margin removes the padding from the parent container and add it into vue-horizontal.
If the gap is less than margin, this causes overflow to show and peeks into the next content for better UX.
You can replace this section entirely for basic responsive CSS logic if you don't want this "peeking" experience
for the mobile web.
Note that this responsive logic is hyper sensitive to your design choices, it's not a one size fit all solution.
var() has only 95% cross browser compatibility, you should convert it to fixed values.

There are 2 set of logic:
0-768 for peeking optimized for touch scrolling.
>768 for navigation via buttons for desktop/laptop users.
-->
<style scoped>
@media (max-width: 767.98px) {
  .item {
    width: calc((100% - (var(--margin) * 2) + var(--gap)) / var(--count));
    padding: 0 calc(var(--gap) / 2);
  }

  .item:first-child {
    width: calc(
      (100% - (var(--margin) * 2) + var(--gap)) / var(--count) + var(--margin) -
        (var(--gap) / 2)
    );
    padding-left: var(--margin);
  }

  .item:last-child {
    width: calc(
      (100% - (var(--margin) * 2) + var(--gap)) / var(--count) + var(--margin) -
        (var(--gap) / 2)
    );
    padding-right: var(--margin);
  }

  .item:only-child {
    width: calc(
      (100% - (var(--margin) * 2) + var(--gap)) / var(--count) + var(--margin) *
        2 - var(--gap)
    );
  }

  .horizontal {
    margin: 0 calc(var(--margin) * -1);
  }

  .horizontal >>> .v-hl-container {
    scroll-padding: 0 calc(var(--margin) - (var(--gap) / 2));
  }

  .horizontal >>> .v-hl-btn {
    display: none;
  }
}

@media (min-width: 768px) {
  .item {
    width: calc((100% - ((var(--count) - 1) * var(--gap))) / var(--count));
    margin-right: var(--gap);
  }
}
</style>
