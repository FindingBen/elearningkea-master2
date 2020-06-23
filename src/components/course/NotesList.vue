<template>
    <ul class="notesList">
        <li v-for="note in notes" :key="note.noteId" class="notesList__item ">
            <div>
                <div class="notesList__item-time clickable">
                    <span @click="$emit('noteClicked', note)"
                        >video #{{ getVideoNumber(note.videoId) + 1 }} - {{ toHHMMSS(note.videoTimePoint) }}</span
                    >
                    <div class="flexbox align-center">
                        <v-icon @click="$emit('deleteNote', note.noteId)" class="notesList__item-delete clickable"
                            >clear</v-icon
                        >
                        <v-icon @click="$emit('editNote', note)" class="notesList__item-edit clickable">edit</v-icon>
                    </div>
                </div>
                <p>{{ note.noteText }}</p>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: "notesList",
    props: {
        notes: Array,
        videos: Array,
    },
    methods: {
        toHHMMSS(secs) {
            var sec_num = parseInt(secs, 10);
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor(sec_num / 60) % 60;
            var seconds = sec_num % 60;

            return [hours, minutes, seconds]
                .map(v => (v < 10 ? "0" + v : v))
                .filter((v, i) => v !== "00" || i > 0)
                .join(":");
        },
        getVideoNumber(noteVideoId) {
            let video = this.videos.findIndex(_ => _.videoId == noteVideoId);
            return video;
        },
    },
};
</script>

<style lang="scss">
.notesList {
    &__item {
        position: relative;
        display: block;
        background: $theme-blue;
        margin: 1rem 0;
        padding: 0.5rem;
        border-radius: 5px;
        p {
            word-break: break-all;
        }
        &-time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            span {
                font-size: 0.8em;
                color: $grey-medium;
            }
            span:hover {
                color: $grey-light;
            }
        }
        &-delete {
            line-height: 0.8em;
            font-size: 15px !important;
            margin-left: 10px;
            padding: 2px;
            color: $grey-medium;
        }
        &-delete:hover {
            color: $grey-light;
            border-radius: 50%;
            background: grey;
        }
        &-edit {
            line-height: 0.8em;
            font-size: 15px !important;
            margin-left: 10px;
            padding: 2px;
            color: $grey-medium;
        }
        &-edit:hover {
            border-radius: 50%;
            background: grey;
            color: $grey-light;
        }
    }
}
</style>
