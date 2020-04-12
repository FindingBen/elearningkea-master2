<template>
  <div>
  <form class="form-signin"></form>
    <img
      class="mb-4"
      src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
      alt=""
      width="72"
      height="72"
    />
    <h1 class="h3 mb-3 font-weight-normal">Enter your details below</h1>
    <br />
    <label for="email" class="sr-only">First name</label>
    <input
      type="text"
      id="firstName"
      v-model="firstName"
      class="form-control"
      placeholder="Name"
      required
      autofocus
    />
    <br />
    <label for="email" class="sr-only">Last name</label>
    <input
      type="text"
      id="lastName"
      v-model="lastName"
      class="form-control"
      placeholder="Surname"
      required
      autofocus
    />
    <br />
    <label for="email" class="sr-only">Email address</label>
    <input
      type="email"
      id="email"
      v-model="email"
      class="form-control"
      placeholder="Email address"
      required
      autofocus
    />
    <br />
    <label for="password" class="sr-only">Password</label>
    <input
      type="password"
      id="password"
      v-model="password"
      class="form-control"
      placeholder="Password"
      required
    />
    <br />

    <div class="checkbox mb-3">
      <label> <input type="checkbox" value="remember-me" /> Remember me </label>
    </div>
    <button
      v-on:click="pushUser"
      class="btn btn-lg btn-primary btn-block"
      type="submit"
    >
      Sign in
    </button>
    <br />
    <label for="">Already have an account?</label>
    <u><a href="http://localhost:8080/login">Log in</a></u>
  </div>
</template>

<script>
//import axios from 'axios'
export default {
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };
  },
      computed:{
        user () {
        return this.$store.getters.user
      }
      },
      watch: {
        user (value) {
          if (value !== null && value !== undefined) {
            this.$router.push('/login')
          }
        }
      },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    
    },
    pushUser(){
      this.$store.dispatch("createUser", {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName
      });
    }  

  },
};
</script>
