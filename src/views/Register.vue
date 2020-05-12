<template>
  <div>
  <form @submit.prevent="onSignup" class="form-signin">
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
    <label for="accountType" class="sr-only">Account type</label>
    <select class="browser-default custom-select" id="role" v-model="role">
    <option selected>Select option below</option>
    <option value="Student">Student</option>
    <option value="Teacher">Teacher</option>
 
    </select>
    <br />


    <div class="checkbox mb-3">
      <label> <input type="checkbox" value="remember-me" /> Remember me </label>
    </div>
    <button
      v-on:click="onSignup()"
      class="btn btn-lg btn-primary btn-block"
      type="submit"
    >
      Sign in
    </button>
    <br />
    <label for="">Already have an account?</label>
    <u><a href="http://localhost:8080/login">Log in</a></u>
  </form>
    
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
      lastName: "",
      role:""   
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
   async onSignup() {
     
     await this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
        firstName:this.firstName,
        lastName:this.lastName,
        role:this.role
        
      });
    },
    async mounted(){
      const user={
      email: this.email,
      password: this.password,
      firstName:this.firstName,
      lastName:this.lastName,
      role:this.role
       
    }
      await this.$store.dispatch("createUser", user);
    } 

  },

};
</script>
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  text-align: center;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  text-align: center;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  text-align: center;
}
</style>
