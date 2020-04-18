<template>
    <div id="Dashboard">
        
        <div>
          Hi, {{user.firstName}}
        </div>
      
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name:"Dashboard",
   
    
 data(){
    return{
      isLoggedIn:false,
      currentUser:false,    
    }
  },
  
  computed:{
  user() {
     return this.$store.getters.user;
},   
},
  created(){
if(firebase.auth().currentUser){
  this.isLoggedIn=true;
  this.currentUser=firebase.auth().currentUser.uid;
}

},
methods:{
   fetchUsers(){
   if(firebase.auth().currentUser){
     this.currentUser=firebase.auth().currentUser.uid
   }
     this.$store.dispatch("fetch_user",this.currentUser);
  },

},
mounted(){
  if(!this.item){
    this.fetchUsers()
  }
  
}
 
}
</script>

<style lang="stylus" scoped>



</style>