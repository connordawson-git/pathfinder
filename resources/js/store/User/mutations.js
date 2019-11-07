export default {
    SET_ROLES(state, roles) {
        state.roles = roles;
    },
    SET_USERS(state, users) {
        state.all = users;
    },
    SET_CURRENT(state, user) {
        state.current = user;
    },

    RESET_CURRENT(state) {
        state.current = {};
    },
}
