/*      PASSWORD
 * All password related axios endpoints. They will be prefixed with /api/
 */
import axios from '@/classes/Axios.js'

export default {
    request(data) {
        return axios.post('/passwords/request', data);
    },

    reset(data) {
        return axios.post('/passwords/reset', data);
    },
}
