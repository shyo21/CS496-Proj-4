<style scoped>
.innercontainer {
  height: 640px;
}
.title {
  width: 100%;
  height: 680px;
  font-size: 100px;
  background-image: url("../imgs/cities/athens.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 150px;
  color: #fff;
  text-shadow: 4px 4px 10px rgb(61, 61, 61);
}
input {
  opacity: 0;
}
.img-box {
  width: 100%;
  height: 655px;
  display: inline-block;
}
.container img {
  max-width: 96%;
  max-height: 96%;
  display: block;
  margin: auto;
}
.title {
  font-weight: 700;
  align-self: center;
}
.submitButton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #3f3f3f;
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

.submitButton:active,
.submitButton:hover {
  background: #5f5f5f;
  outline: 0;
  flex-basis: 7rem;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.submitButton:disabled {
  opacity: 0.5;
}
.submitButton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: #ffffff;
}

.submitButton span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.submitButton:hover span {
  padding-right: 25px;
}

.submitButton:hover span:after {
  opacity: 1;
  right: 0;
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
.imgSubmitCont {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-box {
  z-index: 10;
}
.canvas-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
}
</style>

<template>
  <div class="innercontainer">
    <label>
      <p class="title">
        Click to Add your <br />
        Awesome Image
      </p>
      <input
        type="file"
        id="file"
        accept="image/*"
        @change="handleFileUpload($event)"
        @click="scrollTo"
      />
    </label>

    <div class="imgSubmitCont">
      <div style="position: relative">
        <div class="img-box">
          <img
            ref="image"
            id="image"
            :src="imagePreview"
            v-show="showPreview"
          />
        </div>
        <div class="canvas-box">
          <canvas
            id="detection"
            :width="imageWidth"
            :height="imageHeight"
          ></canvas>
        </div>
      </div>
      <div>
        <button class="submitButton" v-on:click="submitFile" :disabled="isLoad">
          <span>Submit</span>
        </button>
        <br />
        <br />
        <button
          id="car"
          class="submitButton"
          v-on:click="postClicked"
          :disabled="isLoad"
        >
          <span>Car</span>
        </button>
        <br />
        <br />
        <button
          id="laptop"
          class="submitButton"
          v-on:click="postClicked"
          :disabled="isLoad"
        >
          <span>Laptop</span>
        </button>
        <br />
        <br />
        <button
          id="backpack"
          class="submitButton"
          v-on:click="postClicked"
          :disabled="isLoad"
        >
          <span>Backpack</span>
        </button>
        <br />
        <br />
        <router-link to="/MakeArticle">
          <button id="backpack" class="nextButton" :disabled="isLoad">
            <span>Next</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      objects: [],
      objTypes: {},
      file: "",
      showPreview: false,
      imagePreview: "",
      imageUrlHolder: "",
      loadfile: require("../imgs/cities/load.gif"),
      isLoad: false,
      imageWidth: 10,
      imageHeight: 10,
      originalWidth: 10,
      originalHeight: 10,
      xratio: 1,
      yratio: 1,
    };
  },

  methods: {
    postClicked(event) {
      const clickedId = event.currentTarget.id;
      console.log(clickedId);
    },

    scrollTo() {
      window.scrollTo({ top: 1000, behavior: "smooth" });
    },

    submitFile() {
      //this.getinfo();
      let formData = new FormData();
      formData.append("image", this.file);
      let objectList;
      this.imageUrlHolder = this.imagePreview;
      this.imagePreview = this.loadfile;
      this.isLoad = true;

      this.imageWidth = this.$refs.image.clientWidth;
      this.imageHeight = this.$refs.image.clientHeight;
      this.originalWidth = this.$refs.image.naturalWidth;
      this.originalHeight = this.$refs.image.naturalHeight;
      this.xratio = this.imageWidth / this.originalWidth;
      this.yratio = this.imageHeight / this.originalHeight;
      // e.g. {class: 'backpack', x: 7, y: 33, w: 1043, h: 1361} - 이게 원소 하나
      axios
        .post("http://192.249.18.199:80/detect", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (res) {
          var data = res["data"];
          return data["data"];
        })
        .catch(function () {
          console.log("FAILURE!!");
        })
        .then((datas) => {
          this.imagePreview = this.imageUrlHolder;
          this.isLoad = false;
          objectList = datas;
          this.objects = objectList;
          console.log(objectList);
          if (datas.length == 0) {
            alert("감지된 상품이 없습니다!");
          }
          var canvas = document.getElementById("detection");
          var mySet = new Set();
          if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            for (let i = 0; i < datas.length; i++) {
              switch (this.objects[i].class) {
                case "car":
                  ctx.strokeStyle = "#03a1fc";
                  mySet.add("car");
                  break;
                case "laptop":
                  ctx.strokeStyle = "#ff8800";
                  mySet.add("laptop");
                  break;
                case "backpack":
                  ctx.strokeStyle = "#fc0390";
                  mySet.add("backpack");
                  break;
              }

              ctx.lineWidth = 2;
              this.roundRect(
                ctx,
                this.objects[i].x * this.xratio,
                this.objects[i].y * this.yratio,
                this.objects[i].w * this.xratio,
                this.objects[i].h * this.yratio,
                5
              );
            }
            this.objTypes = mySet;
          }

          // var obj = objectList[1];
          // console.log(obj["class"])
        });
    },

    roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === "undefined") {
        stroke = true;
      }
      if (typeof radius === "undefined") {
        radius = 5;
      }
      if (typeof radius === "number") {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
      } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius.br,
        y + height
      );
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();
      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
  },
};
</script>
