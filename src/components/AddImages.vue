<style scoped>
.imagescontainer {
  display: block;
}
.imagescontainer img {
  max-width: 200px;
  max-height: 200px;
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.inputsCont {
}
.title {
  text-align: center;

  font-size: 100px;
  font-weight: 700;
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
  margin-top: 3rem;
  margin-bottom: 2rem;
}
.submitCont {
  position: absolute;
  top: 85%;
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
</style>

<template>
  <div class="imagescontainer">
    <p class="title">3,2,1 Cheeze~</p>
    <hr />
    <div class="inputsCont">
      <label>
        File Preview
        <input
          type="file"
          id="img_0"
          accept="image/*"
          @change="handleFileUpload_0($event)"
        />
      </label>
      <label>
        File Preview
        <input
          type="file"
          id="img_1"
          accept="image/*"
          @change="handleFileUpload_1($event)"
        />
      </label>
      <label>
        File Preview
        <input
          type="file"
          id="img_2"
          accept="image/*"
          @change="handleFileUpload_2($event)"
        />
      </label>
      <img v-bind:src="imagePreview_0" v-show="showPreview_0" />
      <img v-bind:src="imagePreview_1" v-show="showPreview_1" />
      <img v-bind:src="imagePreview_2" v-show="showPreview_2" />
      <div class="submitCont">
        <button class="nextButton" @click="submitFile">
          <span>Submit</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file_0: "",
      showPreview_0: false,
      imagePreview_0: "",
      file_1: "",
      showPreview_1: false,
      imagePreview_1: "",
      file_2: "",
      showPreview_2: false,
      imagePreview_2: "",
      pid: 0,
    };
  },

  methods: {
    submitFile() {
      let formData = new FormData();
      //pid 받아와야함
      formData.append("pid", this.pid);
      formData.append("img_0", this.file_0);
      formData.append("img_1", this.file_1);
      formData.append("img_2", this.file_2);

      axios
        .post("http://192.249.18.199:80/upload_img", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    handleFileUpload_0(event) {
      this.file_0 = event.target.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          this.showPreview_0 = true;
          this.imagePreview_0 = reader.result;
          console.log(this.imagePreview_0);
          console.log(this.showPreview_0);
        }.bind(this),
        false
      );

      if (this.file_0) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file_0.name)) {
          reader.readAsDataURL(this.file_0);
        }
      }
    },

    handleFileUpload_1(event) {
      this.file_1 = event.target.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          this.showPreview_1 = true;
          this.imagePreview_1 = reader.result;
        }.bind(this),
        false
      );

      if (this.file_1) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file_1.name)) {
          reader.readAsDataURL(this.file_1);
        }
      }
    },

    handleFileUpload_2(event) {
      this.file_2 = event.target.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          this.showPreview_2 = true;
          this.imagePreview_2 = reader.result;
        }.bind(this),
        false
      );

      if (this.file_2) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file_2.name)) {
          reader.readAsDataURL(this.file_2);
        }
      }
    },
  },
};
</script>
