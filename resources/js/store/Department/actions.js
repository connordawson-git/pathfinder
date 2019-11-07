import Department from '@/api/Department'

export default {

    /**
     * Retrieves all departments
     *
     * @param {object} commit
     *
     * @return {Promise}
     */
    getAll({ commit }) {
        return Department.all()
            .then(response => {
                commit('SET_DEPARTMENTS', response.data.departments);
            })
            .catch((error => {
                console.log(error.statusText);
            }));
    },

    /**
     * Retrieves a single Department by ID
     *
     * @param {object} commit
     * @param {Number} departmentId
     *
     * @return {Promise}
     */
    getDetails({ commit }, departmentId) {
        return Department.show(departmentId)
            .then(response => {
                commit('SET_CURRENT', response.data.department);
            })
            .catch((error => {
                console.log(error.statusText);
            }));
    },

    deleteDepartment({ }, departmentId) {
        return Department.delete(departmentId)
    },

    update({ }, data ) {
        return Department.update(data);
    },
}
