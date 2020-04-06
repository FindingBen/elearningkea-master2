<template>
    <main class="course-page">
        <section class="course-page__video">
            <div class="course-page__video-content">
                <youtube
                    v-if="course"
                    :video-id="course.video[0].link"
                    player-width="100%"
                    player-height="100%"
                    @ready="ready"
                ></youtube>
            </div>
            <div class="course-page__video-description p-1" v-if="course">
                {{ course.courseDescription }}
            </div>
        </section>
        <section class="course-page__notes">
            <div><h1>Notes</h1></div>
            <div></div>
            <div><textarea v-model="note"></textarea></div>
        </section>
    </main>
</template>

<script>
    export default {
        name: "course",
        data() {
            return {
                player: null,
                note: "",
            };
        },
        computed: {
            course() {
                return this.$store.getters.get_course;
            },
        },
        methods: {
            addNote() {
                console.log(this.player.getCurrentTime());
            },
            ready(event) {
                this.player = event.target;
            },
        },
        async mounted() {
            await this.$store.dispatch("fetch_course", this.$route.params.id);
        },
    };
</script>

<style lang="scss">
    .course-page {
        height: calc(100% - 50px);
        display: grid;
        grid-template-columns: 5fr 1fr;
        grid-template-rows: 1fr;
        &__video {
            height: 100%;
            display: flex;
            flex-direction: column;
            &-content {
                flex: 5;
                div {
                    height: 100%;
                }
            }
            &-description {
                flex: 1;
            }
        }
        &__notes {
            background: $theme-primary-shade-up;
            height: 100%;
            display: flex;
            flex-direction: column;
            div:first-child {
                padding: 1rem;
                background: lighten($theme-primary, 15%);
                flex: 0 1 3rem;
            }
            div:nth-child(2) {
                flex: 1 1 auto;
            }
            div:nth-child(3) {
                flex: 0 1 8rem;
                padding: 1rem;
                background: lighten($theme-primary, 15%);
                textarea {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
