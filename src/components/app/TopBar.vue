<template>
    <section class="app-topbar">
        <div class="wrapper">
            <topBarMobile
                :user="user"
                :isLoggedIn="isLoggedIn"
                ref="topBarMobile"
                @logout="logout()"
                v-if="windowWidth && windowWidth < 850"
            ></topBarMobile>
            <v-icon
                style="margin-left: auto; color: white; margin-right: 8px;"
                v-if="windowWidth && windowWidth < 850"
                @click.stop="showMenu()"
            >
                menu
            </v-icon>

            <ul v-if="windowWidth && windowWidth > 849">
                <li v-if="isLoggedIn" :class="{ 'app-topbar-active': this.$route.fullPath.includes('dashboard') }">
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li :class="{ 'app-topbar-active': this.$route.fullPath.includes('courses') }">
                    <router-link to="/courses">Courses</router-link>
                </li>
                <li v-if="!isLoggedIn" :class="{ 'app-topbar-active': this.$route.fullPath.includes('login') }">
                    <router-link to="/login">Login</router-link>
                </li>
                <li v-if="user && isLoggedIn && user.roleId == 2">
                    <v-menu ref="menu" offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn text v-on="on" color="white">
                                <v-icon v-if="$refs.menu && !$refs.menu.isActive" left>expand_more</v-icon>
                                <v-icon v-if="$refs.menu && $refs.menu.isActive" left>expand_less</v-icon>
                                <span>{{ user.firstName }}</span>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="link in items" :key="link.text" :to="link.route">
                                <v-list-item-title>{{ link.title }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="logout()">
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import firebase from "firebase";
import topBarMobile from "./TopBarMobile";
export default {
    name: "topBar",
    components: {
        topBarMobile,
    },
    data() {
        return {
            isLoggedIn: false,
            currentUser: null,

            items: [
                { title: "Courses overview", route: "/overview" },
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
        showMenu() {
            this.$refs.topBarMobile.drawer = !this.$refs.topBarMobile.drawer;
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
.v-list {
    background: $theme-primary-shade-up !important;
    * {
        color: white !important;
    }
    a:hover {
        background: lighten($theme-primary-shade-up, 5%);
    }
    div:hover {
        background: lighten($theme-primary-shade-up, 5%);
    }
}
.v-navigation-drawer {
    background: $theme-primary-shade-up !important;
    * {
        color: white !important;
    }
}
.app-topbar {
    width: 100%;
    background-color: $theme-dark;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .wrapper {
        height: 100%;
        max-width: calc(1200px - 1.5rem);
        width: 100%;
        margin: 0 1rem;
        display: flex;
        align-items: center;
        ul {
            // margin-left: auto !important;
            display: grid;
            grid-template-columns: auto auto 1fr;
            height: 100%;
            width: 100%;
            li {
                height: 100%;
                padding: 0 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                a:hover {
                    color: $grey-medium;
                }
            }
            li:last-child {
                margin-right: 0 !important;
                display: flex;
                justify-content: flex-end;
                &:hover {
                    background: none;
                }
            }
            li:hover {
                background: rgba(160, 160, 160, 0.3);
            }
        }
    }
}
.app-topbar-active {
    background: rgba(160, 160, 160, 0.3);
}
</style>
