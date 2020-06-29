<template>
    <v-snackbar v-model="snackbar" :color="type" :timeout="timeout" left bottom style="opacity: 0.8">
        <span style="font-size: 18px">{{ message }}</span>
        <v-btn flat @click="removeAppAlert" style="color: white !important; background: green !important">
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name: "baseAppAlert",
    props: ["type", "index", "message"],
    data() {
        return {
            snackbar: true,
            timeout: 2500,
        };
    },
    computed: {
        alert() {
            return this.$store.getters.get_app_alert;
        },
    },
    created() {
        if (this.type === "error") {
            this.timeout = 4500;
        }

        setTimeout(() => {
            this.removeAppAlert();
        }, this.timeout + 10);
    },
    methods: {
        removeAppAlert() {
            this.$store.dispatch("remove_app_alert");
        },
    },
};
</script>

<style lang="scss">
.v-snack__content button {
    background-color: transparent !important;
}

.alert-container {
    position: absolute;
    right: 20px;
    top: 66px;
    z-index: 50;
}

.v-alert {
    background-color: #ffffff;
    border: 1px solid grey;
    margin: 0;
    padding: 15px 35px 15px 20px;
    margin-bottom: 12px;
    border-radius: 3px;
    min-width: 360px;
    color: blue;

    button {
        outline: 0;
        cursor: pointer;

        span {
            float: right;
            position: absolute;
            right: 16px;
            top: 10px;
            font-size: 20px;
        }
    }
}

.v-snack__wrapper.success {
    background-color: $accent !important;
    border-color: $accent !important;
}

.v-snack__wrapper.info {
    background-color: #2196f3 !important;
    border-color: #2196f3 !important;
}

.v-snack__wrapper.error {
    background-color: $error !important;
    border-color: $error !important;
}

.v-snack--top {
    top: 0;
    font-family: Roboto, sans-serif;
}

.v-snack__wrapper {
    margin-top: 20px !important;
}

.v-snack * {
    font-family: Roboto, sans-serif !important;
}
</style>
