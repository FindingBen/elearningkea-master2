import axios from "axios";

export default {
    state: {
        quiz: null,
    },
    getters: {
        get_quiz(state) {
            return state.quiz;
        },
    },
    mutations: {
        set_quiz(state, quiz) {
            state.quiz = quiz;
        },
    },

    actions: {
        async fetch_course_quiz({ commit }, courseId) {
            try {
                const quiz = await axios.get(`https://localhost:44310/api/quiz/?CourseId=${courseId}`);
                commit("set_quiz", quiz.data);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
