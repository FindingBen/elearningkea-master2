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
        },
        temp() {}
    },
    actions: {
        async fetch_notes({ commit }, payload) {
            try {
                const notes = await axios.get(
                    `https://elearningkeaapi.azurewebsites.net/api/notes?courseId=${payload.courseId}&userId=${payload.userId}`
                );
                commit("set_notes", notes.data);
            } catch (e) {
                console.log(e);
            }
        },
        async create_note({ commit }, note) {
            try {
                await axios.post(`https://elearningkeaapi.azurewebsites.net/api/notes`, note);
                commit("temp");
            } catch (e) {
                console.log(e);
            }
        },
        async delete_note({ commit }, noteId) {
            console.log(noteId);
            try {
                await axios.delete(`https://elearningkeaapi.azurewebsites.net/api/notes/${noteId}`);
                commit("temp");
            } catch (e) {
                console.log(e);
            }
        }
    }
};
