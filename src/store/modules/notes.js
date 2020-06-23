import axios from "axios";

export default {
    state: {
        notes: [],
    },
    getters: {
        get_notes(state) {
            return state.notes;
        },
    },
    mutations: {
        set_notes(state, notes) {
            state.notes = notes;
        },
        temp() {},
    },
    actions: {
        async fetch_notes({ commit }, payload) {
            try {
                const notes = await axios.get(
                    `https://localhost:44310/api/notes?courseId=${payload.courseId}&userId=${payload.userId}`
                );
                commit("set_notes", notes.data);
            } catch (e) {
                console.log(e);
            }
        },
        async create_note({ commit }, note) {
            try {
                await axios.post(`https://localhost:44310/api/notes`, note);
                commit("temp");
            } catch (e) {
                console.log(e);
            }
        },
        async update_note({ commit }, note) {
            try {
                await axios.put(`https://localhost:44310/api/notes/${note.noteId}`, note);
                commit("temp");
            } catch (e) {
                console.log(e);
            }
        },
        async delete_note({ commit }, noteId) {
            console.log(noteId);
            try {
                await axios.delete(`https://localhost:44310/api/notes/${noteId}`);
                commit("temp");
            } catch (e) {
                console.log(e);
            }
        },
    },
};
