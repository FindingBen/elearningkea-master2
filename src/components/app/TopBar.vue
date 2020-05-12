<template>
    <section class="app-topbar">
        <div class="wrapper">
            <li v-if="user.role == 'Teacher' && isLoggedIn">
                <router-link to="/admin">Admin panel</router-link>
            </li>
            <ul>
                <li v-if="isLoggedIn">
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/courses">Courses</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <router-link to="/account">My Account</router-link>
                </li>
                <li v-if="!isLoggedIn">
                    <router-link to="/login">Login</router-link>
                </li>
                <li v-if="isLoggedIn">
                    <button v-on:click="logout" class="btn btn-dark">Logout</button>
                </li>
                <li v-if="isLoggedIn">
                    <span class="email black-text">{{ user.firstName }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import firebase from "firebase";
export default {
    name: "topBar",
    data() {
        return {
            isLoggedIn: false,
            currentUser: null,
            items: [
                { title: this.currentUser, route: "#" },
                { title: "Dashboard", route: "/dashboard" },
                { title: "Courses", route: "/courses" },
                { title: "My Account", route: "/account" },
                { title: "Login", route: "/login" },
                { title: "Logout", route: "#" },
            ],
        };
    },
    computed: {
        getCurrentUser() {
            if (this.currentUser) {
                return this.currentUser;
            }
            return null;
        },
        windowWidth() {
            return this.$store.getters.getWindowWidth;
        },
        user() {
            return this.$store.getters.user;
        },
    },
    created() {
        if (firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push("/login");
                });
        },
        async fetchUser() {
            if (firebase.auth().currentUser) {
                this.currentUser = firebase.auth().currentUser.uid;
            }

            await this.$store.dispatch("fetch_user", this.currentUser);
        },
    },
    async mounted() {
        await this.fetchUser();
    },
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
            margin-left: auto !important;
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
