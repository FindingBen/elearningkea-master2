import axios from "axios";

export default {
    state: {
        courses: null,
        course: null,
    },
    getters: {
        get_courses(state) {
            return state.courses;
        },
        get_course(state) {
            return state.course;
        },
    },
    mutations: {
        set_courses(state, courses) {
            state.courses = courses;
        },
        set_course(state, course) {
            state.course = course;
        },
    },

    actions: {
        async fetch_courses({ commit }) {
            try {
                const courses = await axios.get(
                    "https://elearningkeaapi.azurewebsites.net/api/courses"
                );
                commit("set_courses", courses.data);
            } catch (e) {
                console.log(e);
            }
        },
        async fetch_course({ commit }, id) {
            try {
                const course = await axios.get(
                    `https://elearningkeaapi.azurewebsites.net/api/courses/${id}`
                );
                commit("set_course", course.data);
                console.log(course.data);
            } catch (e) {
                console.log(e);
            }
        },
        async fetch_userCourse({ commit }, id) {
            try {
                const course = await axios.get(
                    `https://localhost:44310/api/user/${id}/courses`
                );
                commit("set_course", course.data.userCourse);
                console.log(course.data.userCourse);
            } catch (e) {
                console.log(e);
            }
        },
        async addUserCourse({ commit }, userCourse) {
            try {
                await axios.post(`https://localhost:44310/api/Usercourse`, userCourse);

                commit();
            } catch (e) {
                console.log(e);
            }
        },
    },
};
