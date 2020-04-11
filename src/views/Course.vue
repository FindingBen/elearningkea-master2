<template>
    <main class="course-page">
        <section class="course-page__video">
            <div class="course-page__video-content">
                <youtube
                    v-if="activeVideo"
                    :video-id="activeVideo.link"
                    player-width="100%"
                    player-height="100%"
                    @ready="ready"
                ></youtube>
            </div>
            <bottomActions
                class="course-page__video-content-buttons"
                @previous="previous"
                @next="next"
                :videoTitle="videoTitle"
                :videoIndex="videoIndex"
                :videosLength="course.video.length"
            />
            <div class="course-page__video-description p-3" v-if="course">
                {{ course.courseDescription }}
            </div>
        </section>
        <section class="course-page__notes">
            <div class="course-page__notes-header">
                <h1>Notes</h1>
            </div>
            <div class="course-page__notes-list">
                <notesList :notes="notes" @noteClicked="noteClicked($event)" />
            </div>
            <div class="course-page__notes-textarea">
                <textarea v-model="noteText"></textarea>
                <baseButton @click="addNote">Add</baseButton>
            </div>
        </section>
    </main>
</template>

<script>
    import notesList from "@/components/course/NotesList.vue";
    import bottomActions from "@/components/course/BottomActions.vue";
    export default {
        name: "course",
        components: {
            notesList,
            bottomActions
        },
        data() {
            return {
                player: null,
                activeVideo: null,
                noteText: ""
            };
        },
        computed: {
            course() {
                return this.$store.getters.get_course;
            },
            notes() {
                return this.$store.getters.get_notes;
            },
            videoTitle() {
                if (this.player) {
                    return this.player.playerInfo.videoData.title;
                }
                return null;
            },
            videoIndex() {
                return this.course.video.findIndex(_ => _.videoId === this.activeVideo.videoId);
            }
        },
        methods: {
            async addNote() {
                const note = {
                    noteText: this.noteText,
                    videoTimePoint: this.player.getCurrentTime(),
                    videoId: this.activeVideo.videoId,
                    courseId: this.course.courseId,
                    userId: "9245fe4ad402451cb9ed9c1a04247482"
                };
                if (note.noteText.length < 1) {
                    return;
                }
                await this.$store.dispatch("create_note", note);
                await this.fetchNotes();
            },
            noteClicked(note) {
                this.activeVideo = this.course.video.find(_ => _.videoId === note.videoId);
                this.$nextTick(() => {
                    this.player.playVideo();
                    this.player.seekTo(50, true);
                });
            },
            async fetchNotes() {
                const payload = {
                    courseId: this.course.courseId,
                    userId: "9245fe4ad402451cb9ed9c1a04247482"
                };
                await this.$store.dispatch("fetch_notes", payload);
            },
            previous() {
                const index = this.course.video.findIndex(
                    _ => _.videoId === this.activeVideo.videoId
                );
                if (index == 0) {
                    return;
                }
                this.activeVideo = this.course.video[index - 1];
            },
            next() {
                const index = this.course.video.findIndex(
                    _ => _.videoId === this.activeVideo.videoId
                );
                if (index == this.course.video.length - 1) {
                    return;
                }
                this.activeVideo = this.course.video[index + 1];
            },
            ready(event) {
                this.player = event.target;
            }
        },
        async mounted() {
            await this.$store.dispatch("fetch_course", this.$route.params.id).then(() => {
                this.activeVideo = this.course.video[0];
            });
            await this.fetchNotes();
        }
    };
</script>

<style lang="scss">
    .course-page {
        height: calc(100vh - 50px);
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
            max-height: 100%;
            display: flex;
            flex-direction: column;
            &-header {
                padding: 1rem;
                background: lighten($theme-primary, 15%);
                flex: 0 1 3rem;
            }
            &-list {
                flex: 1 1 auto;
                max-height: calc(100vh - 258px);
                overflow-x: hidden;
                overflow-y: auto;
                &::-webkit-scrollbar {
                    background-color: $theme-dark !important;
                    width: 6px !important;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: darkgrey !important;
                    outline: 1px solid slategrey !important;
                }
                padding: 1rem;
            }
            &-textarea {
                flex: 0 1 10rem;
                padding: 1rem;
                background: lighten($theme-primary, 15%);
                textarea {
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
</style>
