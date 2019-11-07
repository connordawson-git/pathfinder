export default {
    resetError({ commit }) {
        commit('SET_ERROR', {
            error: null
        });
    },

    resetValidationErrors({ commit }) {
        commit('SET_VALIDATION_ERRORS', {
            validation_errors: null
        });
    },

    setError({ commit }, data) {
        commit('SET_ERROR', data);
    },

    setSnackbar({ commit }, data) {
        commit('SET_SNACKBAR', data);
    },

    setValidationErrors({ commit }, data) {
        commit('SET_VALIDATION_ERRORS', data);
    },

    updateProfile({ commit }, user) {
        // Get the localstorage profile details and update them
        let lsUser = JSON.parse(window.localStorage.getItem('user'));
        lsUser.name = user.name;

        window.localStorage.setItem('user', JSON.stringify(lsUser));

        // Update Vuex
        commit('UPDATE_AUTH', {
            user: user
        });
    },
}
