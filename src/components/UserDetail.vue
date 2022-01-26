<template>
  <div>
    <br /><br /><br /><br /><br />
    <p class="title">User Page</p>
    <div>
      <span>User Points</span>
    </div>
    <div id="user-register">
      <span>Registered</span>
    </div>
    <div id="user-trade">
      <span>Deal-in-Progress</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from "vue-cookies";
export default {
  created() {
    this.getProductList();
  },
  data() {
    return {
      n: "",
    };
  },
  methods: {
    clicker() {
      console.log("hi");
    },
    async getProductList() {
      var myToken = VueCookies.get("accessToken");
      axios
        .get("http://54.180.160.3:8080/product/myList", {
          headers: {
            Authorization: "Bearer " + myToken,
          },
        })
        .then((res) => {
          var dataOrigin = res["data"];
          return dataOrigin["data"];
        })
        .then((lst) => {
          var root = document.getElementById("user-register");
          for (let i = 0; i < lst.length; i++) {
            let comp = lst[i];
            let child = document.createElement("div");
            child.setAttribute("class", "registerList");
            child.setAttribute("pid", comp["pid"]);
            child.setAttribute(
              "style",
              "background-color: green; color: white; border: solid white 1px"
            );
            child.textContent = comp["product_type"];
            child.onclick = function () {
              const myPid = this.getAttribute("pid");
              axios
                .get(
                  "http://54.180.160.3:8080/transaction/prefer-list?pid=" +
                    myPid
                )
                .then((res) => {
                  var data = res["data"];
                  return data["data"];
                })
                .then((lst) => {
                  for (let i = 0; i < lst.length; i++) {
                    var currentData = lst[i];
                    var child = document.createElement("div");
                    child.setAttribute(
                      "style",
                      "background-color: yellow; border: solid white 1px"
                    );
                    child.textContent = currentData["userName"];
                    child.setAttribute("uid", currentData["uid"]);
                    child.onclick = function () {
                      const oppnentUid = this.getAttribute("uid");
                      let data = {
                        uid: oppnentUid,
                        product_id: myPid,
                      };
                      axios
                        .post(
                          "http://54.180.160.3:8080/transaction/start-trade",
                          data,
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization:
                                "Bearer " + VueCookies.get("accessToken"),
                            },
                          }
                        )
                        .then((res) => {
                          var data = res["data"];
                          console.log(res);
                          return data;
                        })
                        .then((data) => {
                          console.log(data);
                          if (data["statusCode"] == 200) {
                            alert("거래가 요청되었습니다!");
                          }
                          if (data["statusCode"] == 400) {
                            alert("이미 거래가 진행중입니다.");
                          }
                        });
                    };
                    this.appendChild(child);
                  }
                  this.onclick = null;
                });
            };
            root.appendChild(child);
          }
        });
      axios
        .get("http://54.180.160.3:8080/transaction/trade-list", {
          headers: {
            Authorization: "Bearer " + VueCookies.get("accessToken"),
          },
        })
        .then((res) => {
          var data = res["data"];
          return data["data"];
        })
        .then((data) => {
          const root = document.getElementById("user-trade");
          for (let i = 0; i < data.length; i++) {
            var comp = data[i];
            var child = document.createElement("div");
            child.setAttribute("tid", comp["id"]);
            child.setAttribute(
              "style",
              "background-color: black; color: white; border: solid white 1px"
            );
            child.textContent =
              "거래 id   " +
              comp["id"] +
              "구매자:    " +
              comp["buyer"] +
              "판매자:    " +
              comp["seller"] +
              "가격:    " +
              comp["bill"];
            root.appendChild(child);
          }
        });
    },
  },
};
</script>
