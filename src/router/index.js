import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/auth/Auth.vue";
import AdminPage from "@/views/admin-page/AdminPage.vue";
import SkisView from "@/views/admin-page/SkisView.vue";
import SnowboardsView from "@/views/admin-page/SnowboardsView.vue";
import SkiBootsView from "@/views/admin-page/SkiBootsView.vue";
import BootsView from "@/views/admin-page/BootsView.vue";
import Cart from "@/views/Cart.vue";
import OrdersView from "@/views/admin-page/OrdersView.vue";
import "@/initApp.js";
import db from "@/data-provider";
import firebase from "firebase/app";
import "firebase/auth";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "snowboards",
        name: "Snowboards",
        component: SnowboardsView,
      },
      {
        path: "skis",
        name: "Skis",
        component: SkisView,
      },
      {
        path: "skiboots",
        name: "SkiBoots",
        component: SkiBootsView,
      },
      {
        path: "boots",
        name: "Boots",
        component: BootsView,
      },
      {
        path: "orders",
        name: "Orders",
        component: OrdersView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "pure-menu-selected",
});

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = await firebase.getCurrentUser();
  let isAdmin = false;
  if (user) {
    isAdmin = await db
      .collection("USERS")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          return data.isAdmin;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return false;
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        return false;
      });
  }

  if (requiresAuth ) {
    if(isAdmin){
      next();
    }else{
      next("login")
    }
  }else if(!requiresAuth){
    next();
  }
});

export default router;
