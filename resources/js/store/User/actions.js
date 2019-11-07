import User from '@/api/User'

export default {
    /**
     * Retrieves all Users
     *
     * @param {object} commit
     *
     * @return {Promise}
     */
    all({ commit }) {
        return User.all()
            .then(response => {
                commit("SET_USERS", response.data.users);
            })
            .catch((error => {
                console.log(error.statusText);
            }));
    },
    /**
     * Retrieves all possible Roles a User can have
     *
     * @param {object} commit
     *
     * @return {Promise}
     */
    getRoles({ commit }) {
        return User.roles()
            .then(response => {
                commit("SET_ROLES", response.data.roles);
            })
            .catch((error => {
                console.log(error.statusText);
            }));
    },
    /**
     * sets a user as current (used in modals)
     *
     * @param {object} commit
     *
     * @return {Promise}
     */
    setCurrent({ commit }, user) {
        commit("SET_CURRENT", user);
    },
}
