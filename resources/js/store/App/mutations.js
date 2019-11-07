export default {
    SET_AUTH(state, auth) {
        state.auth = auth;
    },

    SET_AUTH_LOGOUT(state) {
        let emptyUser = {
            name: null,
            user_role: null,
        }

        state.auth.user = emptyUser;
        state.auth.token = '';
        state.auth.authenticated = false;
    },

    SET_ERROR(state, payload) {
        state.error = payload.error;
    },

    SET_LAST_SCOPE(state, lastScope) {
        state.last_scope = lastScope;
    },

    SET_SNACKBAR(state, payload) {
        state.snackbar = {...payload};
    },

    SET_VALIDATION_ERRORS(state, payload) {
        state.validation_errors = payload.validation_errors;
    },

    UPDATE_AUTH(state, payload) {
        state.auth.user.name = payload.user.name;
    },
}
