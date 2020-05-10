export default {
    state: {
        windowWidth: window.innerWidth,
    },
    getters: {
        getWindowWidth(state) {
            return state.windowWidth;
        },
    },
    mutations: {
        setWindowWidth(state) {
            state.windowWidth = window.innerWidth;
        },
    },

    actions: {},
};
