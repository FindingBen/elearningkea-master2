<template>
    <main class="all-courses pb-2">
        <header>
            <h1>All Courses</h1>
            <input
                type="text"
                v-model="searchText"
                placeholder="Search"
                class="input-dark courses-search-input"
                v-on:keyup.enter="fetchCoursesBySearchText"
            />
        </header>

        <section class="all-courses__grid" v-if="courses && userCourses">
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
                        <router-link
                            v-if="userCourses.some(_ => _.courseId === course.courseId)"
                            :to="{ name: 'Course', params: { id: course.courseId } }"
                        >
                            <baseButton round>Watch course</baseButton>
                        </router-link>
                        <baseButton @click="pushCourse(course)" round v-else>Sign up</baseButton>
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
        <div class="loader" v-else>
            <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </div>
    </main>
</template>

<script>
import firebase from "firebase";

export default {
    name: "allCourses",
    computed: {
        courses() {
            return this.$store.getters.get_courses;
        },
        course() {
            return this.$store.getters.get_course;
        },
        user() {
            return this.$store.getters.user;
        },
        userCourses() {
            return this.$store.getters.get_user_courses;
        },
    },
    data() {
        return {
            searchText: "",
            currentUser: false,
        };
    },
    methods: {
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
        pushCourse(course) {
            if (firebase.auth().currentUser) {
                this.currentUser = firebase.auth().currentUser.uid;
            }
            const userCourse = {
                userId: this.currentUser,
                courseId: course.courseId,
            };

            this.$store.dispatch("addUserCourse", userCourse).then(() => {
                this.$store.dispatch("fetch_courses", "");
                this.$store.dispatch("fetch_user_courses_mainpage", this.user.userId);
            });
            this.$store.dispatch("set_app_alert", {
                type: "success",
                message: "You have successfuly signed up for a course. Happy watching!",
            });
        },
        async fetchCoursesBySearchText() {
            await this.$store.dispatch("fetch_courses", this.searchText);
        },
    },
    async mounted() {
        await this.$store.dispatch("fetch_courses", "");
        await this.$store.dispatch("fetch_user_courses_mainpage", this.user.userId);
    },
    destroyed() {
        this.$store.dispatch("reset_courses");
    },
};
</script>

<style lang="scss">
.all-courses {
    height: 100%;
    width: 100%;
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
    .courses-search-input {
        @media (max-width: 600px) {
            width: 100%;
        }
    }

    &__grid {
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: minmax(350px, auto);
        grid-gap: 1.5rem;
        margin: 0 1.5rem;
        @media (max-width: 850px) {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
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
                max-height: 350px;
                max-width: 350px;
                filter: brightness(60%);
            }
            @media (max-width: 950px) {
                &-content {
                    width: 90% !important;
                }
                img {
                    max-height: 450px;
                    height: 450px;
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
                    @media (max-width: 1200px) {
                        flex-direction: column;
                        align-items: flex-start !important;

                        &__info {
                            margin-left: 0rem !important;
                            order: 1 !important;
                        }
                        a,
                        button {
                            margin-top: 1rem;
                            order: 2 !important;
                        }
                    }
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
