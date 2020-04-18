<template>
    <ul class="notesList">
        <li v-for="note in notes" :key="note.noteId" class="notesList__item ">
            <div>
                <div class="notesList__item-time clickable">
                    <span @click="$emit('noteClicked', note)"
                        >video #{{ getVideoNumber(note.videoId) + 1 }} -
                        {{ minsToHHMMSS(note.videoTimePoint) }}</span
                    >
                    <span
                        @click="$emit('deleteNote', note.noteId)"
                        class="notesList__item-delete clickable"
                        >X</span
                    >
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
            videos: Array
        },
        methods: {
            minsToHHMMSS(minutesInput) {
                var mins_num = parseFloat(minutesInput, 10);
                var hours = Math.floor(mins_num / 60);
                var minutes = Math.floor(mins_num - (hours * 3600) / 60);
                var seconds = Math.floor(mins_num * 60 - hours * 3600 - minutes * 60);

                // Appends 0 when unit is less than 10
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                return hours + ":" + minutes + ":" + seconds;
            },
            getVideoNumber(noteVideoId) {
                let video = this.videos.findIndex(_ => _.videoId == noteVideoId);
                return video;
            }
        }
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

                margin-left: 10px;
                color: $grey-medium;
            }
            &-delete:hover {
                color: $grey-light;
            }
        }
    }
</style>
