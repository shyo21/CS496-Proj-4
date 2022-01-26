<template>
  <div class="priceinnerCont">
    <div class="priceTitle">Money Money Money</div>
    <input class="inputPrice" v-model="price" placeholder="How Much is It?" />
    <div class="key2">
      <button
        class="subbutton"
        id="1"
        :style="{ background: isActive[0] ? '#616161' : '' }"
        :disabled="isActive[1] || isActive[2]"
        @click="toggleHandler"
      >
        미개봉
      </button>
      <button
        class="subbutton"
        id="2"
        :style="{ background: isActive[1] ? '#616161' : '' }"
        :disabled="isActive[0] || isActive[2]"
        @click="toggleHandler"
      >
        거의 새것
      </button>
      <button
        class="subbutton"
        id="3"
        :style="{ background: isActive[2] ? '#616161' : '' }"
        :disabled="isActive[1] || isActive[0]"
        @click="toggleHandler"
      >
        사용감 있음
      </button>
    </div>
    <div class="submitCont">
      <button class="nextButton" @click="priceSubmit">
        <span>Submit</span>
      </button>
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  data() {
    return {
      price: "",
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive: [this.isActive1, this.isActive2, this.isActive3],
    };
  },
  methods: {
    //여기 해야됨 !!
    priceSubmit() {
      VueCookies.set("user-price", Number(this.price));
      this.$router.push("/MakeArticle");
    },

    toggleHandler(event) {
      const targetId = event.currentTarget.id;
      this.isActive[targetId - 1] = !this.isActive[targetId - 1];
      if (targetId == 1) {
        VueCookies.set("user-proStatus", "미개봉");
      } else if (targetId == 2) {
        VueCookies.set("user-proStatus", "거의 새 것");
      } else {
        VueCookies.set("user-proStatus", "사용감 있음");
      }
    },
  },
};
</script>

<style scoped>
.submitCont {
  position: absolute;
  top: 73%;
  left: 85%;
}
.nextButton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #ff5c5c;
  color: #ffffff;

  margin: 0 50px 0 0;
  padding: 0.7rem 1rem;
  height: auto;

  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 20px;

  display: inline-block;
  flex-basis: 6rem;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  cursor: pointer;

  transition: 0.5s;
}

.nextButton:active,
.nextButton:hover {
  background: #ff7a7a;
  outline: 0;
  flex-basis: 7rem;
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
.subbutton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #b4b4b4;
  color: #ffffff;

  margin: 10rem 1.5rem;
  padding: 0.5rem 1rem;

  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 15px;

  display: inline-block;
  flex-basis: auto;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  cursor: pointer;

  transition: 0.5s;
}

.subbutton:active,
.subbutton:hover {
  background: #8b8b8b;
  outline: 0;
  flex-basis: auto;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24);
}
.subbutton:disabled {
  opacity: 0.3;
}
.key2 {
  display: flex;
  justify-content: center;
}
</style>
