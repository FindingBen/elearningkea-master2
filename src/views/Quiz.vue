<template>
    <main class="quiz" v-if="quiz && currentQuestion">
        <h1>{{ quiz.courseTitle }}</h1>
        <p>{{ infoText }}</p>
        <template v-if="showQuestions">
            <p>question {{ currentQuestionIndex + 1 }}/{{ quiz.questions.length }}</p>
            <section class="quiz-question">
                {{ currentQuestion.content }}
            </section>
            <section class="quiz-answers">
                <div
                    v-for="answer in currentQuestion.answers"
                    :key="answer.id"
                    class="clickable"
                    @click="setAnswer(answer)"
                    :class="{
                        correct: selectedAnswer && selectedAnswer.isCorrect && selectedAnswer.id == answer.id,
                        incorrect: selectedAnswer && !selectedAnswer.isCorrect && selectedAnswer.id == answer.id,
                    }"
                >
                    {{ answer.text }}
                </div>
            </section>
        </template>
        <div class="quiz-congratz" v-else>
            <h3 class="mb-2">Contratulations</h3>
            <p>You have now completed a course: {{ quiz.courseTitle }}</p>
            <router-link :to="{ name: 'Courses' }" class="mr-2">
                <baseButton round>Learn more</baseButton>
            </router-link>
            <router-link :to="{ name: 'Dashboard' }">
                <baseButton round>Your dashboard</baseButton>
            </router-link>
        </div>
    </main>
</template>

<script>
import firebase from "firebase";
export default {
    name: "quiz",
    data() {
        return {
            currentQuestionIndex: 0,
            infoText: "",
            showQuestions: true,
            selectedAnswer: null,
        };
    },
    computed: {
        quiz() {
            return this.$store.getters.get_quiz;
        },
        currentQuestion() {
            if (this.quiz) {
                return this.quiz.questions[this.currentQuestionIndex];
            }
            return null;
        },
    },
    methods: {
        async setAnswer(answer) {
            this.selectedAnswer = answer;
            if (answer.id === this.currentQuestion.answer) {
                this.selectedAnswer.isCorrect = true;
                this.infoText = "";
                if (this.checkIfLastQuestion() == true) {
                    await this.passCourse();
                    this.showQuestions = false;
                    return;
                }
                this.switchToNextQuestion();
                return;
            }
            this.infoText = "Your answer was incorrect. We suggest to go back to the course and try again later.";
            this.selectedAnswer.isCorrect = false;
        },
        checkIfLastQuestion() {
            if (this.currentQuestionIndex + 1 == this.quiz.questions.length) {
                return true;
            }
            return false;
        },
        switchToNextQuestion() {
            setTimeout(() => {
                this.currentQuestionIndex++;
                this.selectedAnswer = null;
            }, 500);
        },
        async passCourse() {
            const courseUpdateDto = {
                userId: firebase.auth().currentUser.uid,
                courseId: this.quiz.courseId,
                isPassed: true,
            };
            await this.$store.dispatch("update_user_course", courseUpdateDto);
        },
    },
    mounted() {
        this.$store.dispatch("fetch_course_quiz", this.$route.params.id);
    },
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
            &.correct {
                background-color: $approved;
            }
            &.correct:hover {
                background-color: $approved;
            }
            &.incorrect {
                background-color: $red;
            }
            &.incorrect:hover {
                background-color: $red;
            }
        }
        div:hover {
            background-color: lighten($theme-blue, 7%);
        }
    }
    &-congratz {
        padding: 1em;
        border-radius: 1em;
        background: $theme-primary-shade-up;
        h3 {
            color: green;
        }
    }
}
</style>
