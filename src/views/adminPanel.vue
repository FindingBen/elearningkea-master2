<template>
    <div id="adminPanel" class="pa-4">
        <h2>Create a new course</h2>
        <form @submit.prevent="" class="form-signin">
            <label for="courseTitle">Course Name</label>
            <input type="text" id="courseTitle" class="form-control" placeholder="Title" v-model="courseTitle" />
            <label for="courseDescription" class="mt-3">Course Description</label>
            <input
                type="text"
                id="courseDescription"
                class="form-control"
                placeholder="Description"
                v-model="courseDescription"
            />
            <label for="courseCode" class="mt-3">Course source code</label>
            <input
                type="text"
                id="courseCode"
                class="form-control"
                placeholder="link of source code"
                v-model="courseCode"
            />
            <label for="courseCode" class="mt-3">Image</label>
            <input
                type="text"
                id="backgroundImageUrl"
                class="form-control"
                placeholder="link of source code"
                v-model="backgroundImageUrl"
            />

            <br />
            <button class="btn btn-lg btn-primary btn-block mt-3" v-on:click="addCourse()">Create course</button>
        </form>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "adminPanel",
    data() {
        return {
            isAuthorized: false,
            currentUser: false,
            courseTitle: "",
            courseDescription: "",
            totalDuration: Math.ceil(Math.random() * 10),
            courseCode: "",
            backgroundImageUrl: "",
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
    },
    created() {
        if (firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.uid;
        }
    },
    methods: {
        async addCourse() {
            const course = {
                courseTitle: this.courseTitle,
                courseDescription: this.courseDescription,
                courseCode: this.courseCode,
                totalDuration: this.totalDuration,
                backgroundImageUrl: this.backgroundImageUrl,
            };
            await this.$store.dispatch("addCourse", course);
            this.$router.push({ name: "Overview" });
        },
    },
};
</script>

<style lang="scss">
#adminPanel {
    margin: auto;
    max-width: 1200px;
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
