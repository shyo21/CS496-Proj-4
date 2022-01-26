<template>
  <main>
    <div class="header">
      <h3>Top Stories</h3>
      <p>Responsive sizing, relative to the viewport.</p>
    </div>
    <!-- <img id="sample" :src="this.test" :alt="dd" /> -->
    <vue-horizontal class="horizontal">
      <div class="item" v-for="(img, index) in imgs" :key="index">
        <div class="card" :id="img.alt" @click="itemClickHandler">
          <img class="image" :src="img.url" :alt="img.alt" />
          <div class="content">
            <div>
              <div class="brand">
                <svg class="icon" viewBox="0 0 24 24">
                  <path
                    d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"
                  />
                  <path
                    d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"
                  />
                </svg>
                <div class="name">
                  {{ categories[index].text }}
                </div>
              </div>
              <div class="title">
                {{ prices[index].number }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </vue-horizontal>
  </main>
</template>

<script>
import VueHorizontal from "vue-horizontal";
import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  components: { VueHorizontal },
  created() {
    this.getProducts();
  },
  data() {
    return {
      productDetail: null,
      test: null,
      isLoading: true,
      productInfo: null,
      imgFile: null,
      imgs: [],
      categories: [],
      prices: [],
    };
  },
  methods: {
    getProducts: async function () {
      await axios
        .get("http://54.180.160.3:8080/product/load")
        .then((response) => {
          console.log(response);
          this.productInfo = response.data.data;
          console.log(this.productInfo);
        })
        .catch(function () {
          console.log("getProducts Failed");
        });
      console.log(this.productInfo.length);
      console.log(this.productInfo[0]["pid"]);
      for (let i = 0; i < this.productInfo.length; i++) {
        this.setData(i);
        this.getImg(this.productInfo[i]["pid"]);
      }
    },

    getImg: async function (pid) {
      let formData = new FormData();
      formData.append("pid", pid);

      await axios
        .post("http://192.249.18.199:80/call_img_0", formData)
        .then((response) => {
          console.log(response);
          this.imgFile = response.data;
          // var a = document.getElementById("sample");
          // a.src = "data:image/;base64," + this.imgFile;
          // this.test = "data:image/;base64," + this.imgFile;
          console.log(this.imgFile);
        })
        .catch(function () {
          console.log("getImg Failed");
        });

      var imgJson = {};
      imgJson.url = "data:image/;base64," + this.imgFile;
      imgJson.alt = pid;
      this.imgs.push({ ...imgJson });
    },

    setData: function (i) {
      // for (let i = 0; i < this.productInfo.length; i++) {
      var categoriesJson = {};
      var pricesJson = {};
      var cur_pid = this.productInfo[i]["pid"];

      // var imgJson = {};
      // this.getImg(cur_pid);
      // imgJson.url = "data:image/;base64," + this.imgFile;
      // imgJson.alt = "img-" + cur_pid;
      // this.imgs.push({ ...imgJson });

      categoriesJson.text = this.productInfo[i]["product_type"];
      categoriesJson.alt = "type-" + cur_pid;

      pricesJson.text = this.productInfo[i]["price"].toString();
      pricesJson.alt = "price-" + cur_pid;

      this.categories.push({ ...categoriesJson });
      this.prices.push({ ...pricesJson });
      // }
    },

    itemClickHandler(event) {
      const targetId = event.currentTarget.id;
      console.log(targetId);
      VueCookies.set("cur_pid", targetId);
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
