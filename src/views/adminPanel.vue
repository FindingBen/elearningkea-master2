<template>
    <div id="adminPanel">
        <h2>Create a new course</h2>
        <form @submit.prevent="addCourse()" class="form-signin">
            <label for="courseTitle">Course Name</label>
            <input type="text" id="courseTitle" class="form-control" placeholder="Title" v-model="courseTitle">
            <label for="courseDescription">Course Description</label>
            <input type="text" id="courseDescription" class="form-control" placeholder="Description" v-model="courseDescription">
            <label for="totalDuration">Course duration(time)</label>
            <input type="number" id="totalDuration" class="form-control" placeholder="Duration" v-model="totalDuration"> 
            <label for="courseCode">Course source code</label>
            <input type="text" id="courseCode" class="form-control" placeholder="link of source code" v-model="courseCode">
            <br>
            <button class="btn btn-lg btn-primary btn-block" v-on:click="addCourse()">Create course</button>
        </form>
    </div>
</template>


<script>
import firebase from 'firebase'

export default {
    name:'adminPanel',
    data() {
            return {
                courseTitle:"",
                courseDescription:"",
                totalDuration:"",
                courseCode:""
                
            };
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
           
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.uid;
            }
        },
        methods:{
          async addCourse(){
                const course={

                    courseTitle:this.courseTitle,
                    courseDescription:this.courseDescription,
                    totalDuration:this.totalDuration,
                    courseCode:this.courseCode,
                    
                }
               await this.$store.dispatch("addCourse", course );
                console.log(course);
                
            }    
        }
}
</script>

<style scoped>
html,
body {
  height: 100%;
  text-align: center;
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
.form-signin input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  text-align: center;
}
.form-signin input[type="number"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  text-align: center;
}
.form-signin input[type="date"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  text-align: center;
}
</style>