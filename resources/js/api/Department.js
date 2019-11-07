/*      Department
 * All axios endpoints for a User. They will be prefixed with /api/
 */
import axios from '@/classes/Axios.js'
import { promised } from 'q';

export default {
    all() {
        return axios.get('/departments');
    },

    create(data) {
        return axios.post('/departments', data);
    },

    delete(id) {
        return axios.delete(`departments/${id}`);
    },

    update(data) {
        return axios.put(`/departments/${data.id}`, data)
        .then(response => response.data)
        .catch(error => promised.reject(error.response));
    },

    show(id) {
        return axios.get(`departments/${id}`);
    }
}
