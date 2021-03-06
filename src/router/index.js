import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
const Courses = () => import("@/views/AllCourses.vue");
const Course = () => import("@/views/Course.vue");
const login = () => import("@/views/login.vue");
const Register = () => import("@/views/Register.vue");
const Dashboard = () => import("@/views/Dashboard.vue");
const Quiz = () => import("@/views/Quiz.vue");
const Admin = () => import("@/views/adminPanel.vue");
const courseOverview =() => import("@/views/courseOverview.vue");

Vue.use(VueRouter);

const routes = [
    {
        path: "/courses",
        name: "Courses",
        component: Courses,
    },
    {
        path: "/",
        name: "Courses",
        component: Courses,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/courses/:id",
        name: "Course",
        component: Course,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/quiz/:id",
        name: "Quiz",
        component: Quiz,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: login,
        meta: {
            requiresGuest: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/overview",
        name: "Overview",
        component: courseOverview,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    //Chek for required authentication guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!firebase.auth().currentUser) {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath,
                },
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (firebase.auth().currentUser) {
            next({
                path: "/dashboard",
                query: {
                    redirect: to.fullPath,
                },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
