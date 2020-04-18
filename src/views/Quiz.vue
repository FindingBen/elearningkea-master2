<template>
    <main class="quiz">
        <h1>{{ course.courseTitle }}</h1>
        <section class="quiz-question">This is a question</section>
        <section class="quiz-answers">
            <div>A.</div>
            <div>B.</div>
            <div>C.</div>
            <div>D.</div>
        </section>
    </main>
</template>

<script>
    export default {
        name: "quiz",
        computed: {
            course() {
                return this.$store.getters.get_course;
            }
        }
    };
</script>

<style lang="scss">
    .quiz {
        position: relative;
        max-height: calc(100vh - 50px);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1 {
            position: absolute;
            top: 15px;
            font-size: 2em;
        }
        &-question {
            display: flex;

            justify-content: center;
            align-items: center;
            background-color: $theme-primary-shade-up;
            max-width: 600px;
            width: 100%;
            height: 100px;
            border-radius: 10px;
        }
        &-answers {
            display: flex;
            flex-wrap: wrap;
            max-width: 600px;
            width: 100%;
            justify-content: space-around;
            div {
                border-radius: 10px;
                padding: 10px;
                margin-top: 1rem;
                width: 40%;
                background-color: $theme-blue;
            }
        }
    }
</style>
