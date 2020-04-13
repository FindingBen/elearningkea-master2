import axios from "axios";

export default {
    state: {
        courses: null,
        course: null
    },
    getters: {
        get_courses(state) {
            return state.courses;
        },
        get_course(state) {
            return state.course;
        }
    },
    mutations: {
        set_courses(state, courses) {
            state.courses = courses;
        },
        set_course(state, course) {
            state.course = course;
        }
    },
    
    actions: {
        async fetch_courses({ commit }) {
            try {
                const courses = await axios.get("https://localhost:44310/api/courses");
                commit("set_courses", courses.data);
            } catch (e) {
                console.log(e);
            }
        },
        async fetch_course({ commit }, id) {
            try {
                const course = await axios.get(`https://localhost:44310/api/courses/${id}`);
                commit("set_course", course.data);
            } catch (e) {
                console.log(e);
            }
        }
    }
};
