export default {
    SET_CURRENT(state, department) {
        state.current = department;
    },
    SET_DEPARTMENTS(state, departments) {
        state.all = departments;
    },
    DELETE_DEPARTMENT(state, department) {
        let index = state.departments.findIndex(item => item.id === department.id)
        state.departments.splice(index, 1)
    }
}
