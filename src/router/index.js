import Vue from "vue";
import VueRouter from "vue-router";
<<<<<<< HEAD
 import firebase from 'firebase';
=======
import firebase from "firebase";
>>>>>>> 78e6ba2f129c15e4cf9bc33eef10ff96703af15b
const Courses = () => import("@/views/AllCourses.vue");
const Course = () => import("@/views/Course.vue");
const login = () => import("@/views/login.vue");
const Register = () => import("@/views/Register.vue");
const Dashboard = () => import("@/views/Dashboard.vue");
<<<<<<< HEAD
const Account = () => import("@/views/account.vue");


=======
const Quiz = () => import("@/views/Quiz.vue");
>>>>>>> 78e6ba2f129c15e4cf9bc33eef10ff96703af15b

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
        component: Courses,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/courses/:id",
        name: "Course",
        component: Course,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/quiz/:id",
        name: "Quiz",
        component: Quiz,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    }
<<<<<<< HEAD
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
=======
>>>>>>> 78e6ba2f129c15e4cf9bc33eef10ff96703af15b
];

const router = new VueRouter({
    mode: "history",
    routes
});

<<<<<<< HEAD
router.beforeEach((to, from, next)=>{
  //Chek for required authentication guard
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      next({
        path: '/login',
        query: {
          redirect:to.fullPath
        }
      })
    }else{
      next();
    }
  }else if(to.matched.some(record=>record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path: '/dashboard',
        query: {
          redirect:to.fullPath
        }
      })
    }else{
      next();
    }
  }else{
    next();
  }
});


=======
router.beforeEach((to, from, next) => {
    //Chek for required authentication guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!firebase.auth().currentUser) {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (firebase.auth().currentUser) {
            next({
                path: "/dashboard",
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
>>>>>>> 78e6ba2f129c15e4cf9bc33eef10ff96703af15b

export default router;
