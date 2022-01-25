<template>
  <div class="keyword-selector">
    <div class="key1">
      <button class="mainbutton" id="내구성" @click="keywordMenuHandler">
        <span>내구성</span>
      </button>
      <transition name="slide-fade">
        <div class="key2" v-if="toggleText1">
          <button
            class="subbutton"
            id="1"
            :style="{ background: isActive[0] ? '#616161' : '' }"
            :disabled="isActive[1] || isActive[2]"
            @click="keywordHandler"
          >
            {{ sentence1 }}
          </button>
          <button
            class="subbutton"
            id="2"
            :style="{ background: isActive[1] ? '#616161' : '' }"
            :disabled="isActive[0] || isActive[2]"
            @click="keywordHandler"
          >
            {{ sentence2 }}
          </button>
          <button
            class="subbutton"
            id="3"
            :style="{ background: isActive[2] ? '#616161' : '' }"
            :disabled="isActive[1] || isActive[0]"
            @click="keywordHandler"
          >
            {{ sentence3 }}
          </button>
        </div>
      </transition>
    </div>
    <transition name="slide-fade">
      <textarea
        class="textinput1"
        v-if="toggleText1"
        v-model="message1"
        placeholder="여러줄을 입력해보세요"
      ></textarea>
    </transition>
    <div class="key1">
      <button class="mainbutton" id="디자인" @click="keywordMenuHandler">
        <span>디자인</span>
      </button>
      <transition name="slide-fade">
        <div class="key2" v-if="toggleText2">
          <button
            class="subbutton"
            id="4"
            :style="{ background: isActive[3] ? '#616161' : '' }"
            :disabled="isActive[4] || isActive[5]"
            @click="keywordHandler"
          >
            {{ sentence4 }}
          </button>
          <button
            class="subbutton"
            id="5"
            :style="{ background: isActive[4] ? '#616161' : '' }"
            :disabled="isActive[3] || isActive[5]"
            @click="keywordHandler"
          >
            {{ sentence5 }}
          </button>
          <button
            class="subbutton"
            id="6"
            :style="{ background: isActive[5] ? '#616161' : '' }"
            :disabled="isActive[3] || isActive[4]"
            @click="keywordHandler"
          >
            {{ sentence6 }}
          </button>
        </div>
      </transition>
    </div>
    <transition name="slide-fade">
      <textarea
        class="textinput1"
        v-if="toggleText2"
        v-model="message2"
        placeholder="여러줄을 입력해보세요"
      ></textarea>
    </transition>
    <div class="key1">
      <button class="mainbutton" id="상태" @click="keywordMenuHandler">
        <span>상태</span>
      </button>
      <transition name="slide-fade">
        <div class="key2" v-if="toggleText3">
          <button
            class="subbutton"
            id="4"
            :style="{ background: isActive[6] ? '#616161' : '' }"
            :disabled="isActive[7] || isActive[8]"
            @click="keywordHandler"
          >
            {{ sentence7 }}
          </button>
          <button
            class="subbutton"
            id="5"
            :style="{ background: isActive[7] ? '#616161' : '' }"
            :disabled="isActive[6] || isActive[8]"
            @click="keywordHandler"
          >
            {{ sentence8 }}
          </button>
          <button
            class="subbutton"
            id="6"
            :style="{ background: isActive[8] ? '#616161' : '' }"
            :disabled="isActive[6] || isActive[7]"
            @click="keywordHandler"
          >
            {{ sentence9 }}
          </button>
        </div>
      </transition>
    </div>
    <div class="key1">
      <button class="mainbutton" id="alt1" @click="keywordMenuHandler">
        <span>{{ other1 }}</span>
      </button>
      <transition name="slide-fade">
        <textarea
          class="textinput2"
          v-if="toggleText4"
          v-model="message4"
          placeholder="여러줄을 입력해보세요"
        ></textarea>
      </transition>
    </div>
    <div class="key1">
      <button class="mainbutton" id="alt2" @click="keywordMenuHandler">
        <span>{{ other2 }}</span>
      </button>
      <transition name="slide-fade">
        <textarea
          class="textinput2"
          v-if="toggleText5"
          v-model="message5"
          placeholder="여러줄을 입력해보세요"
        ></textarea>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  beforeMount() {
    this.other1 = "키워드 1";
    this.other2 = "키워드 2";
  },
  created() {
    this.pStatus = "상태-" + "미개봉";
    //인자를 넣어줘야 합니다! (동적으로)
    this.postNLP(this.pStatus);
  },
  data() {
    return {
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      isActive5: false,
      isActive6: false,
      isActive7: false,
      isActive8: false,
      isActive9: false,
      isActive: [
        this.isActive1,
        this.isActive2,
        this.isActive3,
        this.isActive4,
        this.isActive5,
        this.isActive6,
        this.isActive7,
        this.isActive8,
        this.isActive9,
      ],
      toggleText1: false,
      toggleText2: false,
      toggleText3: false,
      toggleText4: false,
      toggleText5: false,
      sentence1: "",
      sentence2: "",
      sentence3: "",
      sentence4: "",
      sentence5: "",
      sentence6: "",
      sentence7: "",
      sentence8: "",
      sentence9: "",
      other1: "",
      other2: "",
      message1: "",
      message4: "",
      message5: "",
      nlpResult: null,
    };
  },
  methods: {
    //NLP post 함수, 물품 상태 인자로 넣어주어야함 >> 새로고침 버튼 클릭 시 호출
    postNLP: async function (productStatus) {
      var nlpPostData = {
        category_content_1: "내구성",
        category_content_2: "디자인",
        category_content_3: productStatus,
      };

      axios
        .post("http://192.249.18.213:80/idea_generation/", nlpPostData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          this.nlpResult = response.data;
          console.log("data========", this.nlpResult);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    keywordHandler(event) {
      const targetId = event.currentTarget.id;
      this.isActive[targetId - 1] = !this.isActive[targetId - 1];
    },

    keywordMenuHandler(event) {
      const targetId = event.currentTarget.id;
      switch (targetId) {
        case "내구성":
          this.toggleText1 = !this.toggleText1;
          this.sentence1 = this.nlpResult["내구성"][0];
          this.sentence2 = this.nlpResult["내구성"][1];
          this.sentence3 = this.nlpResult["내구성"][2];
          break;
        case "디자인":
          this.toggleText2 = !this.toggleText2;
          this.sentence4 = this.nlpResult["디자인"][0];
          this.sentence5 = this.nlpResult["디자인"][1];
          this.sentence6 = this.nlpResult["디자인"][2];
          break;
        case "상태":
          this.toggleText3 = !this.toggleText3;
          this.sentence7 = this.nlpResult[this.pStatus][0];
          this.sentence8 = this.nlpResult[this.pStatus][1];
          this.sentence9 = this.nlpResult[this.pStatus][2];
          break;
        case "alt1":
          this.toggleText4 = !this.toggleText4;
          break;
        case "alt2":
          this.toggleText5 = !this.toggleText5;
          break;
      }
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

input {
  margin: 0 1rem;
}
.textinput1 {
  margin-top: 1rem;
  margin-left: 19.5rem;
  width: 80rem;
  height: 5rem;
  border: 1.7px solid #9292926b;
}
.textinput2 {
  margin-left: 1.5rem;
  width: 80rem;
  height: 5rem;
  border: 1.7px solid #9292926b;
}
.keyword-selector {
  margin-top: 30px;
}
.mainbutton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #3f3f3f;
  color: #ffffff;

  margin: 0.8rem 0 0 10%;
  padding: 0.5rem 0.5rem;

  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  border: none;
  border-radius: 3px;

  display: inline-block;
  flex-basis: 6rem;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  cursor: pointer;

  transition: 0.5s;
}

.mainbutton:active,
.mainbutton:hover {
  background: #5f5f5f;
  outline: 0;
  flex-basis: 7rem;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.mainbutton:disabled {
  opacity: 0.5;
}
.mainbutton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: #ffffff;
}

.mainbutton span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.mainbutton:hover span {
  padding-right: 25px;
}

.mainbutton:hover span:after {
  opacity: 1;
  right: 0;
}

.subbutton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #b4b4b4;
  color: #ffffff;

  margin: 0 0 0 1.5em;
  padding: 0.5rem 1rem;

  font-size: 0.8rem;
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
.key1 {
  display: flex;
  width: 100%;
  align-items: baseline;
}
.key2 {
  margin-left: 0.35rem;
  display: inline;
  width: 70%;
}
</style>
