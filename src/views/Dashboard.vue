<template>
    <div id="Dashboard">
        <br />
        <main class="all-courses">
            <h1 class="display-3" v-if="user">Hello, {{ user.firstName }}</h1>
            <p class="lead">
                This is your dashboard page, here you can find the courses that you previously signed up for.
            </p>
            <hr class="my-4" />
            <!-- <br />
            <h1>Your courses:</h1>
            <br /> -->
            <section class="all-courses__grid" v-if="userCourses">
                <div class="courses-card" v-for="course in userCourses" :key="course.id">
                    <div title="Course quiz passed" class="courses-card__passed" v-if="course.isPassed">
                        <v-icon>done</v-icon>
                    </div>
                    <img :src="getImage(course.backgroundImageUrl)" alt="course image" />
                    <div class="courses-card-content">
                        <div class="courses-card-content-top">
                            <router-link :to="{ name: 'Course', params: { id: course.courseId } }">
                                <h2>{{ course.courseTitle }}</h2>
                            </router-link>
                            <p class="pt-1 pb-1">{{ course.courseDescription }}</p>
                        </div>
                        <div class="courses-card-content-footer flexbox align-center ">
                            <router-link :to="{ name: 'Course', params: { id: course.courseId } }">
                                <baseButton round>Watch course</baseButton>
                            </router-link>
                            <div class="courses-card-content-footer__info">
                                <span>Duration:</span>
                                <span class="pb-1 grey-font">
                                    {{ time_convert(course.totalDuration) }}
                                </span>
                                <br />
                                <span>Published at:</span>
                                <span class="grey-font">
                                    {{ new Date(course.publishedAt).toLocaleDateString() }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div v-else>
                <div class="loader">
                    <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "Dashboard",

    data() {
        return {
            isLoggedIn: false,
            currentUser: false,
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        userCourses() {
            return this.$store.getters.get_courses;
        },
    },
    created() {
        if (firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.uid;
        }
    },
    methods: {
        async fetchUsers() {
            if (firebase.auth().currentUser) {
                this.currentUser = firebase.auth().currentUser.uid;
            }
            await this.$store.dispatch("fetch_user", this.currentUser);
        },
        fetchCourses() {
            this.$store.dispatch("fetch_user_courses", this.currentUser);
        },
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
    },

    async mounted() {
        await this.fetchUsers();
        this.fetchCourses();
    },
    destroyed() {
        this.$store.dispatch("reset_courses");
    },
};
</script>

<style lang="scss">
.all-courses {
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;

    header {
        display: flex;
        justify-content: space-between;
        padding: 1.5rem 0;
        font-size: 16px;
    }

    &__grid {
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: minmax(350px, 350px);
        grid-gap: 1.5rem;
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
            &__passed {
                position: absolute;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 0;
                right: 0;
                height: 50px;
                width: 50px;
                transform: translate(40%, -40%);
                background-color: green;
                border-radius: 50%;
                i {
                    color: white;
                }
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

.hr {
    background-color: white;
    height: 5px;
}

.Jumbotron {
    width: 50%;
    text-align: center;
}
</style>
