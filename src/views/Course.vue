<template>
    <main class="course-page" v-if="course">
        <section class="course-page__video">
            <div class="course-page__video-content">
                <youtube
                    v-if="activeVideo && render"
                    :video-id="activeVideo.link"
                    player-width="100%"
                    player-height="100%"
                    @ready="ready"
                ></youtube>
            </div>
            <bottomActions
                class="course-page__video-content-buttons"
                @closeDescription="showDescription = false"
                @openDescription="showDescription = true"
                @previous="previous"
                @next="next"
                :windowWidth="windowWidth"
                :showDescription="showDescription"
                :videoTitle="videoTitle"
                :videoIndex="videoIndex"
                :videosLength="course.video.length"
            />
            <div class="course-page__video-description p-3 pt-0" v-if="showDescription">
                {{ course.courseDescription }}
                <router-link
                    title="Take a quiz to complete this course!"
                    class="quiz-watch-button"
                    :to="{ name: 'Quiz', params: { id: course.courseId } }"
                >
                    <baseButton round>Take Quiz</baseButton>
                </router-link>
            </div>
        </section>
        <section class="course-page__notes" v-if="showNotes">
            <div class="course-page__notes-header">
                <h1>Notes</h1>
                <v-icon @click="showNotes = !showNotes">keyboard_arrow_right</v-icon>
            </div>
            <div class="course-page__notes-list">
                <notesList
                    :notes="notes"
                    :videos="course.video"
                    @noteClicked="noteClicked($event)"
                    @deleteNote="deleteNote($event)"
                    @editNote="editNote($event)"
                />
            </div>
            <div class="course-page__notes-textarea">
                <div class="course-page__notes-textarea__wrapper">
                    <textarea maxlength="999" v-model="noteText" rows="4"></textarea>
                    <span>characters: {{ noteText.length }}/999</span>
                </div>
                <baseButton @click="addNote" v-if="!editNoteMode" class="mt-4">Add</baseButton>
                <baseButton @click="saveEditedNote()" v-if="editNoteMode" class="mt-4 mr-2">Update</baseButton>
                <baseButton @click="resetEditMode()" v-if="editNoteMode" class="mt-4">Cancel</baseButton>
            </div>
        </section>
        <section
            class="course-page__notes notes-placeholder clickable"
            v-if="!showNotes"
            @click="showNotes = !showNotes"
        >
            <v-icon>keyboard_arrow_left</v-icon>
        </section>
    </main>
    <div class="loader" v-else>
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
</template>

<script>
import firebase from "firebase";
import notesList from "@/components/course/NotesList.vue";
import bottomActions from "@/components/course/BottomActions.vue";
export default {
    name: "course",
    components: {
        notesList,
        bottomActions,
    },
    data() {
        return {
            player: null,
            activeVideo: null,
            render: false,
            noteText: "",
            editNoteMode: false,
            showNotes: true,
            showDescription: true,
            tempNote: null,
            note: null,
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
            return "";
        },
        videoIndex() {
            return this.course.video.findIndex(_ => _.videoId === this.activeVideo.videoId);
        },
        windowWidth() {
            return this.$store.getters.getWindowWidth;
        },
    },
    methods: {
        async addNote() {
            const note = {
                noteText: this.noteText,
                videoTimePoint: this.player.getCurrentTime(),
                videoId: this.activeVideo.videoId,
                courseId: this.course.courseId,
                userId: firebase.auth().currentUser.uid,
            };
            if (note.noteText.length < 1) {
                return;
            }
            await this.$store.dispatch("create_note", note);
            this.noteText = "";
            await this.fetchNotes();
        },
        async deleteNote(noteId) {
            await this.$store.dispatch("delete_note", noteId);
            await this.fetchNotes();
        },
        async editNote(note) {
            this.editNoteMode = true;
            this.note = note;
            this.noteText = note.noteText;
        },
        resetEditMode() {
            this.noteText = "";
            this.note = null;
            this.editNoteMode = false;
        },
        async saveEditedNote() {
            this.note.noteText = this.noteText;
            await this.$store.dispatch("update_note", this.note);
            this.resetEditMode();
            await this.fetchNotes();
        },
        noteClicked(note) {
            this.activeVideo = this.course.video.find(_ => _.videoId === note.videoId);
            console.log(note);
            this.player.seekTo(note.videoTimePoint, true);
            // this.player.playVideo();
        },
        async fetchNotes() {
            const payload = {
                courseId: this.course.courseId,
                userId: firebase.auth().currentUser.uid,
            };
            await this.$store.dispatch("fetch_notes", payload);
        },
        previous() {
            this.render = false;
            const index = this.course.video.findIndex(_ => _.videoId === this.activeVideo.videoId);
            if (index == 0) {
                return;
            }
            this.activeVideo = this.course.video[index - 1];
            this.$nextTick(() => {
                this.render = true;
            });
        },
        next() {
            this.render = false;

            const index = this.course.video.findIndex(_ => _.videoId === this.activeVideo.videoId);
            if (index == this.course.video.length - 1) {
                return;
            }

            this.activeVideo = this.course.video[index + 1];
            this.$nextTick(() => {
                this.render = true;
            });
        },

        ready(event) {
            this.player = event.target;
        },
    },
    watch: {
        windowWidth: {
            handler(value) {
                if (value < 1200) {
                    this.showNotes = false;
                    this.showDescription = false;
                    return;
                }
                this.showNotes = true;
                this.showDescription = true;
            },
            immediate: true,
        },
    },
    async mounted() {
        await this.$store.dispatch("fetch_course", this.$route.params.id).then(() => {
            this.activeVideo = this.course.video[0];
            this.render = true;
        });
        await this.fetchNotes();
    },
};
</script>

<style lang="scss">
.course-page {
    max-height: calc(100vh - 50px);
    overflow: hidden;
    display: grid;
    grid-template-columns: 5fr auto;
    grid-template-rows: 1fr;
    &__video {
        height: 100%;
        display: flex;
        flex-direction: column;
        &-content {
            flex: 7;
            div {
                height: 100%;
            }
        }
        &-description {
            flex: 1;
            position: relative;
            min-height: 123px;
            .quiz-watch-button {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                a {
                    color: lighten(red, 10%) !important;
                    font-weight: 600;
                }
                a:hover {
                    color: lighten(red, 12%);
                }
            }
        }
        @media (max-width: 1200px) {
            &-content {
                flex: 1;
            }
        }
    }
    &__notes {
        &.notes-placeholder {
            &:hover {
                background: lighten($theme-primary-shade-up, 3%);
            }
            min-width: auto;
        }

        background: $theme-primary-shade-up;
        height: 100%;
        max-height: 100%;
        min-height: calc(100vh - 50px);
        min-width: 300px;
        display: flex;
        flex-direction: column;
        .v-icon {
            font-size: 24px;
            color: #fff;
        }
        &-header {
            display: flex;
            padding: 1rem;
            background: lighten($theme-primary, 15%);
            flex: 0 1 auto;
            justify-content: space-between;
        }
        &-list {
            flex: 1 1 auto;
            max-height: calc(100vh - 300px);
            padding: 0 1rem;
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
        }
        &-textarea {
            flex: 0 1 auto;
            padding: 1rem;
            background: lighten($theme-primary, 15%) !important;

            &__wrapper {
                position: relative;
                span {
                    position: absolute;
                    right: 0px;
                    bottom: -14px;
                    font-size: 0.8em;
                    color: $grey-medium;
                }
                textarea {
                    background-color: lighten($theme-primary, 60%) !important;
                    color: black;
                    width: 100%;
                    height: auto;
                }
            }
        }
    }
}
</style>
