/*      USER
 * All axios endpoints for a User. They will be prefixed with /api/
 */
import axios from '@/classes/Axios.js'

export default {
    create(data) {
        return axios.post('/users', data);
    },

    changePassword(data) {
        return axios.post('/users/change-password', data);
    },

    delete(userid) {
        return axios.delete(`users/${userid}`);
    },

    loggedInUser() {
        return axios.get('/users/logged-in-user');
    },

    login(data) {
        return axios.post('/auth/login', data);
    },

    logout() {
        return axios.get('/auth/logout');
    },

    roles() {
        return axios.get('/users/roles');
    },

    update(data) {
        return axios.put(`/users/${data.id}`, data);
    },
}
