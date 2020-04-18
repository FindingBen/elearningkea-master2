<template>
    <div id="Dashboard">
        <!-- <div v-for="userId in user" :key="userId.id">
          Hi, {{userId}}
        </div> -->
        <h1>Welcome, {{ user.firstName }} {{ user.lastName }}</h1>
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
        },
        created() {
            if (firebase.auth().currentUser) {
                this.isLoggedIn = true;
                this.currentUser = firebase.auth().currentUser.uid;
            }
        },
        methods: {
            fetchUsers() {
                if (firebase.auth().currentUser) {
                    this.currentUser = firebase.auth().currentUser.uid;
                }
                this.$store.dispatch("fetch_user", this.currentUser);
            },
        },
        mounted() {
            if (!this.item) {
                this.fetchUsers();
            }
        },
    };
</script>

<style lang="stylus" scoped></style>
