import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/learn",
    name: "Learn",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Learn.vue"),
  },
  {
    path: "/ImageSubmit",
    name: "ImageSubmit",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ImageSubmit.vue"),
  },
  {
    path: "/MakeArticle",
    name: "MakeArticle",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MakeArticle.vue"),
  },
  {
    path: "/MultiImg",
    name: "MultiImg",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MultiImg.vue"),
  },
  {
    path: "/Test",
    name: "Test",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Detail.vue"),
  },
  {
    path: "/price",
    name: "Price",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Price.vue"),
  },
  {
    path: "/Signup",
    name: "Signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
  {
    path: "/Charge",
    name: "Charge",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Charge.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
