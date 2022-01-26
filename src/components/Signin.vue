<template>
  <div>
    <p class="title">Hello</p>
    <input
      type="text"
      class="email"
      id="email"
      @change="modifyId($event)"
      placeholder="Enter Your E-mail"
    />
    <br />
    <input
      type="password"
      class="passwd"
      id="passwd"
      @change="modifyPw($event)"
      placeholder="Enter Your Password"
    />
    <div class="submitCont">
      <button class="nextButton" @click="submit">
        <span>LogIn</span>
      </button>
    </div>
    <div class="signCont">
      <button class="nexttButton">
        <span> <a href="/#/Signup">Sign Up</a></span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
let id = "";
let pw = "";
let accessToken;
let refreshToken;
export default {
  data() {
    return {};
  },
  methods: {
    modifyId(event) {
      id = event.target.value;
    },
    modifyPw(event) {
      pw = event.target.value;
    },
    submit() {
      let data = {
        email: id,
        password: pw,
      };
      axios
        .post("http://54.180.160.3:8080/user/sign-in", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data)
        .then((data) => data["data"])
        .then((form) => {
          console.log(form);
          accessToken = form["accessToken"];
          refreshToken = form["refreshToken"];
          if (accessToken != null && refreshToken != null) {
            VueCookies.set("uid", data.email, 5000000);
            VueCookies.set("accessToken", accessToken, 5000000);
            VueCookies.set("refreshToken", refreshToken, 5000000);
            console.log(VueCookies.get("uid"));
            console.log(accessToken);
            console.log(refreshToken);
            alert("캇!");
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style scoped>
a {
  color: #fff;
  font-size: 1rem;
}
.email {
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
  font-size: 25px;
  font-weight: 300;

  margin-left: 600px;
  margin-bottom: 30px;
  width: 300px;
}
.passwd {
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
  font-size: 25px;
  font-weight: 300;

  margin-left: 600px;
  margin-bottom: 30px;
  width: 300px;
}
.nickname {
  font-family: "Apple SD Gothic Neo", Roboto, "Noto Sans KR", NanumGothic,
    "Malgun Gothic", sans-serif;
  font-size: 25px;
  font-weight: 300;

  margin-left: 600px;
  width: 300px;
}
.title {
  font-size: 100px;
  font-weight: 900;

  text-align: center;

  padding-top: 7rem;
  padding-bottom: 7rem;
}
.submitCont {
  position: absolute;
  top: 47.5%;
  left: 60%;
}
.signCont {
  position: absolute;
  top: 55.5%;
  left: 60%;
}
.nextButton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #ff5c5c;
  color: #ffffff;

  margin: 0 50px 0 0;
  padding: 0.3rem 1rem;
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
.nexttButton {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: #5ca3ff;
  color: #ffffff;

  margin: 0 50px 0 0;
  padding: 0.3rem 1rem;
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
.nexttButton:active,
.nexttButton:hover {
  background: #7acaff;
  outline: 0;
  flex-basis: 7rem;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.nexttButton:disabled {
  opacity: 0.5;
}
.nexttButton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  color: #ffffff;
}

.nexttButton span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.nexttButton:hover span {
  padding-right: 25px;
}

.nexttButton:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
