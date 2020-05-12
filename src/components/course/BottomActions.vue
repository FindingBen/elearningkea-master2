<template>
    <section class="bottom-actions flexbox align-center p-3 pb-0 mb-3">
        <h4 :title="videoTitle">{{ getTitle }}</h4>
        <div>
            <baseButton @click="$emit('previous')" :disabled="isPreviousDisabled">
                <svg
                    class="bi bi-arrow-left"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                        clip-rule="evenodd"
                    />
                </svg>
            </baseButton>
            <baseButton @click="$emit('next')" :disabled="isNextDisabled" class="mr-2">
                <svg
                    class="bi bi-arrow-right"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                        clip-rule="evenodd"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
                        clip-rule="evenodd"
                    />
                </svg>
            </baseButton>
            <v-icon v-if="showDescription" @click="$emit('closeDescription')">keyboard_arrow_down</v-icon>
            <v-icon v-if="!showDescription" @click="$emit('openDescription')">keyboard_arrow_up</v-icon>
        </div>
    </section>
</template>

<script>
export default {
    name: "bottomActions",
    props: {
        videoTitle: String,
        videoIndex: Number,
        videosLength: Number,
        showDescription: Boolean,
        windowWidth: Number,
    },
    computed: {
        isNextDisabled() {
            return this.videoIndex !== this.videosLength - 1 ? false : true;
        },
        isPreviousDisabled() {
            return this.videoIndex == 0 ? true : false;
        },
        getTitle() {
            if (this.windowWidth < 1200) {
                return `# ${this.videoIndex + 1}`;
            }
            return `# ${this.videoIndex + 1} - ${this.videoTitle}`;
        },
    },
};
</script>

<style lang="scss">
.bottom-actions {
    justify-content: space-between;
    flex-wrap: nowrap;
    h4 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .v-icon {
        font-size: 24px;
        color: #fff;
    }
}
</style>
