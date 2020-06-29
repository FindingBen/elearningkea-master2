<template>
    <div id="app">
        <v-app>
            <topBar />
            <router-view />
            <baseAppAlert v-if="alert" :type="alert.type" :message="alert.message" />
        </v-app>
    </div>
</template>
<script>
import topBar from "@/components/app/TopBar.vue";
export default {
    name: "App",
    components: {
        topBar,
    },
    computed: {
        alert() {
            return this.$store.getters.get_app_alert;
        },
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener("resize", () => this.$store.commit("setWindowWidth"));
        });
    },
};
</script>
<style lang="scss">
body,
html {
    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    max-height: 100vh;
    height: 100vh;
    width: 100vw;
    color: #ffffff;
    background-color: $theme-primary !important;
    overflow: hidden !important;
}
.theme--light.v-application {
    color: #ffffff !important;
    background-color: $theme-primary !important;
}
ul {
    list-style: none;
    padding: 0 !important;
    margin: 0 !important;
}
a {
    text-decoration: none;
    color: #fff !important;
}
a:hover {
    text-decoration: none;
}

#app {
    overflow: auto;
    height: 100%;
}
</style>
