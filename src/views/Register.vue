<template>
   <div>
      <form @submit="onSignup"  class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Enter your details below</h1>
      <label for="email"  class="sr-only">Email address</label>
      <input type="email" id="email" v-model="email" class="form-control" placeholder="Email address" required autofocus>
      <br>
      <label for="password" class="sr-only">Password</label>
      <input type="password" id="password" v-model="password" class="form-control" placeholder="Password" required>
      <br>
      
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me 
        </label>
        
      </div>
      <button v-on:click="onSignup" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <br>
      <label for="">Already have an account?</label> <u><a href="http://localhost:8080/login">Log in</a></u>
     
    </form>
   </div>
      
    
</template>

<script>

export default {
 data(){
   return{
     email:'',
     password:''
   }
 },
 watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
 methods:{
   onSignup(){
     this.$store.dispatch('signUserUp',{email: this.email, password:this.password})
   }
 }
 
};
</script>