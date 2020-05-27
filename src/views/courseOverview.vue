<template>
    
        <main class="all-courses">
            <header>
            <h1>All Courses</h1>
            
  
        </header>
        <section class="all-courses__grid" v-if="courses">
            <div class="courses-card" v-for="course in courses" :key="course.id">
                <img :src="getImage(course.backgroundImageUrl)" alt="course image" />
                <div class="courses-card-content">
                    <div class="courses-card-content-top">
                        <router-link :to="{ name: 'Course', params: { id: course.courseId } }">
                            <h2>{{ course.courseTitle }}</h2>
                        </router-link>
                        <p class="pt-1 pb-1">{{ course.courseDescription }}</p>
                    </div>
                    <div class="courses-card-content-footer flexbox align-center ">
                        
                            <baseButton @click="deleteCourse(course)" round>Delete</baseButton>
                        
                        <div class="courses-card-content-footer__info">
                            <span>Duration:</span>
                            <span class="pb-1 grey-font">
                                {{ time_convert(course.totalDuration) }}
                            </span>
                            <br />
                            <span>Published at:</span>
                            <span class="grey-font">
                                {{ new Date(course.publishedAt).toLocaleString() }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </main>
  
</template>

<script>
import firebase from "firebase";

export default {
    name: 'Overview',
    
    computed: {
            courses() {
                return this.$store.getters.get_adminCourses;
            }
           
        },
        data() {
        return {
            currentUser: false,
        };
    },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.uid;
            }
        },
        methods:{
            time_convert(num) {
            const hours = Math.floor(num / 60);
            const minutes = num % 60;

            if (minutes.toString().length < 2) {
                return `${hours} hours ${minutes} minutes`;
            }
            return `${hours} hours ${minutes} minutes`;
        },
            getImage(imageUrl) {
            if (imageUrl) {
                return imageUrl;
            }
            return "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600";
        },
             getCourses(){

                this.$store.dispatch("fetch_adminCourses"); 

            },
            deleteCourse(course){
               
               return this.$store.dispatch("delete_course",course.courseId);
               console.log(dCourse)
            }
        },
         async mounted() {
        
        this.getCourses();
    },
    destroyed() {
        this.$store.dispatch("reset_courses");
    },
}
</script>

<style lang="scss">
.all-courses {
    height: 100%;
    width: 1200px;
    max-width: 1200px;
    margin: 0 auto;
    header {
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 0;
        font-size: 16px;
        margin: 0 1.5rem;
        @media (max-width: 600px) {
            display: block;
            input {
                margin-top: 1.5em;
            }
        }
    }

    &__grid {
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: minmax(350px, 350px);
        grid-gap: 1.5rem;
        margin: 0 1.5rem;
        @media (max-width: 1100px) {
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(450px, 450px);
        }
        @media (max-width: 750px) {
            grid-auto-rows: minmax(350px, 350px);
        }

        .courses-card {
            border-bottom: 4px darken($grey-extra-dark, 10%) solid;
            border-radius: 3px;
            position: relative;
            height: 100%;
            width: 100%;
            img {
                border-radius: 3px;
                width: 100%;
                height: 100%;
                filter: brightness(60%);
            }
            &-content {
                border-radius: 3px;
                position: absolute;
                top: 0;
                right: 0;
                width: 80%;
                height: 100%;
                padding: 1.5rem;
                background: radial-gradient(circle at left, rgba(0, 0, 0, 0.6) 0, #000 35%);
                display: flex;
                flex-direction: column;
                &-top {
                    flex: 1 1 auto;
                    h2 {
                        font-size: 2em;
                        font-weight: 400;
                        color: #dd625e;
                    }
                }
                &-footer {
                    &__info {
                        margin-left: 1rem;
                    }
                }
            }
        }
        .courses-card:hover {
            img {
                filter: brightness(100%);
                transition: filter 0.5s ease-in-out;
                &-content {
                    transition: background 0.3s ease-in-out;
                    background: radial-gradient(circle at left, rgba(0, 0, 0, 1) 0, #000 35%);
                }
            }
        }
    }
    .grey-font {
        color: $grey-medium !important;
    }
}
</style>
