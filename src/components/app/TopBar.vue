<template>
<<<<<<< HEAD
  <section class="app-topbar">
    <div class="wrapper">
          <router-link to="/dashboard"><h3>Dashboard</h3></router-link>   
      <ul>
        <li>
          <router-link to="/courses">Courses</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/account">My Account</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
           <button v-on:click="logout" class="btn btn-dark">Logout</button>
        </li>
        <li v-if="isLoggedIn">
          <span class="email black-text">{{currentUser}}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase';
export default {
  name: "topBar",
  data(){
    return{
      isLoggedIn:false,
      currentUser:false
    }
  },
  created(){
if(firebase.auth().currentUser){
  this.isLoggedIn=true;
  this.currentUser=firebase.auth().currentUser.email;
}
  },
  methods:{
    logout:function(){
      firebase.auth().signOut().then(()=>{
        this.$router.push('/login')
      })
    }
  }
};
=======
    <section class="app-topbar">
        <div class="wrapper">
            <router-link to="/dashboard"><h3>Dashboard</h3></router-link>
            <ul>
                <li>
                    <router-link to="/courses">Courses</router-link>
                </li>
                <li>
                    <router-link to="/account">My Account</router-link>
                </li>
                <li v-if="!isLoggedIn">
                    <router-link to="/login">Login</router-link>
                </li>
                <li>
                    <button v-on:click="logout" class="btn btn-dark">Logout</button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
    import firebase from "firebase";
    export default {
        name: "topBar",
        data() {
            return {
                currentUser: false
            };
        },
        computed: {
            isLoggedIn() {
                return firebase.auth().currentUser ? true : false;
            }
        },
        methods: {
            logout: function() {
                firebase
                    .auth()
                    .signOut()
                    .then(() => {
                        this.$router.push("/login");
                    });
            }
        }
    };
>>>>>>> 78e6ba2f129c15e4cf9bc33eef10ff96703af15b
</script>

<style lang="scss">
    .app-topbar {
        width: 100%;
        background-color: $theme-dark;
        height: 50px;
        .wrapper {
            height: 100%;
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            ul {
                margin-left: auto;
                display: flex;
                align-items: center;
                li {
                    margin: 0 1rem;
                    a:hover {
                        color: $grey-medium;
                    }
                }
                li:last-child {
                    margin-right: 0;
                }
            }
        }
    }
</style>
