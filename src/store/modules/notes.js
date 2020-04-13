import axios from "axios";

export default {
    state: {
        notes: []
    },
    getters: {
        get_notes(state) {
            return state.notes;
        }
    },
    mutations: {
        set_notes(state, notes) {
            state.notes = notes;
        }
    },
    actions: {
        async fetch_notes({ commit }, payload) {
            try {
                const notes = await axios.get(
                    `https://elearning20200412213341.azurewebsites.net/api/notes?courseId=${payload.courseId}&userId=${payload.userId}`
                );
                commit("set_notes", notes.data);
            } catch (e) {
                console.log(e);
            }
        },
        async create_note({ commit }, note) {
            try {
                await axios.post(
                    `https://elearning20200412213341.azurewebsites.net/api/notes`,
                    note
                );
                commit();
            } catch (e) {
                console.log(e);
            }
        }
    }
};
