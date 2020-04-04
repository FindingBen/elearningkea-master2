import Vue from "vue";
import VueRouter from "vue-router";
const Courses = () => import("@/views/AllCourses.vue");

const Course = () => import("@/views/Course.vue");
const login = () => import("@/views/login.vue");
const Register = () => import("@/views/Register.vue");




Vue.use(VueRouter);

const routes = [
  {
    path: "/courses",
    name: "Courses",
    component: Courses
  },
  {
    path: "/",
    name: "Courses",
    component: Courses
  },
  {
    path: "/courses/:id",
    name: "Course",
    component: Course
  },
  {
    path: "/login",
    name: "Login",
    component: login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
