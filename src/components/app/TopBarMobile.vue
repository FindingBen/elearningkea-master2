<template>
    <v-navigation-drawer v-model="drawer" absolute right temporary>
        <v-list-item>
            <v-list-item-content>
                <span class="email black-text">{{ user.firstName }}</span>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item to="/courses" link>
                <v-list-item-icon>
                    <v-icon>view_quilt</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Courses</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/dashboard" v-if="isLoggedIn" link>
                <v-list-item-icon>
                    <v-icon>view_comfy</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/login" v-if="!isLoggedIn" link>
                <v-list-item-icon>
                    <v-icon>login</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link v-if="isLoggedIn" @click="$emit('logout')">
                <v-list-item-icon>
                    <v-icon>exit_to_app</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "topBarMobile",
    props: {
        user: Object,
        isLoggedIn: Boolean,
    },
    data() {
        return {
            drawer: null,
            items: [
                { title: "Home", icon: "dashboard" },
                { title: "About", icon: "question_answer" },
            ],
        };
    },
};
</script>

<style></style>
