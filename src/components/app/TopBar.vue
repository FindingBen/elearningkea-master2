<template>
    <section class="app-topbar">
        <div class="wrapper">
            <div class="text-center">
                <v-menu v-if="user && user.RoleId == 2 && isLoggedIn" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on" color="grey">
                            <v-icon left>expand_more</v-icon>
                            <span>Admin panel</span>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="link in items" :key="link.text" :to="link.route">
                            <v-list-item-title>{{ link.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
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
                <li v-if="user && isLoggedIn">
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
                { title: "Course overview", route: "/overview" },
                { title: "Create Course", route: "/admin" },
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
