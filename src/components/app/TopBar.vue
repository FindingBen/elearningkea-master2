<template>
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
        <li>
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
import firebase from 'firebase';
export default {
  name: "topBar",
  data(){
    return{
      isLoggedIn:false,
      currentUser:false
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
