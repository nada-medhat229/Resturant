import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignView from "../views/SignView.vue";
import LoginView from "../views/LoginView.vue";
import ProfileView from "../views/ProfileView.vue";
import UpdateProfile from "../components/Profile/UpdateProfile.vue";
import AddNewRest from "../components/AddNewRest/AddNewRest.vue";
import Loading from "../components/AddNewRest/Loading.vue";
import ErrorPage from "../views/ErrorPageView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: SignView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: "/updateprofile",
    name: "UpdateProfile",
    component: UpdateProfile,
  },
  {
    path: "/addnewrest",
    name: "AddNewRest",
    component: AddNewRest,
  },
  {
    path: "/loadDelete",
    name: "Loading",
    component: Loading,
  },
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  // document.title = to.name;
  // document.title = to.params.PageTitle;
  if (to.params.PageTitle !== undefined) {
    document.title = `${to.name}|${to.params.PageTitle}|${process.env.VUE_APP_TITLE}`;
  } else {
    if (to.name == null) {
      document.title = `'UNKnown Page'|${process.env.VUE_APP_TITLE}`;
    } else {
      document.title = `${to.name}|${process.env.VUE_APP_TITLE}`;
    }
    // document.title = to.params.PageTitle;
  }
  next();
});
export default router;
