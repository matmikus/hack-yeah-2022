export const state = () => ({
    isLoggedIn: false,
    activeNav: 'rejestracja',
    list: []
});

export const mutations = {
    setLoggedIn (state, data) {
        state.isLoggedIn = data;
    },
    setNav (state, data) {
        state.activeNav = data;
    },
    addToList (state, data) {
        state.list.push(data);
    }
};

export const actions = {};
