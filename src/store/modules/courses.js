import axios from "axios";

export default {
    state: {
        courses: null,
        course: null,
        admincourses: null,
        userCourses: null,
    },
    getters: {
        get_courses(state) {
            return state.courses;
        },
        get_course(state) {
            return state.course;
        },
        get_adminCourses(state) {
            return state.admincourses;
        },
        get_user_courses(state) {
            return state.userCourses;
        },
    },
    mutations: {
        set_courses(state, courses) {
            state.courses = courses;
        },
        set_course(state, course) {
            state.course = course;
        },
        set_adminCourses(state, admincourses) {
            state.admincourses = admincourses;
        },
        set_user_courses(state, userCourses) {
            state.userCourses = userCourses;
        },
        reset_courses(state, courses) {
            state.courses = null;
        },
        temp() {},
    },

    actions: {
        async fetch_courses({ commit }, searchText) {
            try {
                const courses = await axios.get(`https://localhost:44310/api/courses?searchText=${searchText}`);
                commit("set_courses", courses.data);
            } catch (e) {
                console.log(e);
            }
        },
        async fetch_adminCourses({ commit }) {
            try {
                const courses = await axios.get(`https://localhost:44310/api/courses`);
                commit("set_adminCourses", courses.data);
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
        },
        async fetch_user_courses({ commit }, userId) {
            try {
                const course = await axios.get(`https://localhost:44310/api/courses/user/${userId}`);
                commit("set_courses", course.data);
            } catch (e) {
                console.log(e);
            }
        },
        async fetch_user_courses_mainpage({ commit }, userId) {
            try {
                const course = await axios.get(`https://localhost:44310/api/courses/user/${userId}`);
                commit("set_user_courses", course.data);
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
        async update_user_course({ commit }, courseUpdateDto) {
            try {
                await axios.put(
                    `https://localhost:44310/api/courses/${courseUpdateDto.courseId}/pass`,
                    courseUpdateDto
                );
            } catch (e) {
                console.log(e);
            }
        },
        async addCourse({ commit }, course) {
            try {
                await axios.post(`https://localhost:44310/api/courses`, course);

                commit();
            } catch (e) {
                console.log(e);
            }
        },
        async delete_course({ commit }, courseId) {
            try {
                await axios.delete(`https://localhost:44310/api/courses/${courseId}`);
                commit("temp");
            } catch (e) {
                console.log(e);
            }
        },
        reset_courses({ commit }) {
            commit("reset_courses");
        },
    },
};
