import DepartmentsAdd from '@/layouts/Departments/Add.vue';
import DepartmentsList from '@/layouts/Departments/List.vue';
import DepartmentsView from '@/layouts/Departments/View.vue';
import DepartmentsUpdate from '@/layouts/Departments/Update.vue';

export default [
    {
        path: '/departments/add',
        component: DepartmentsAdd,
        name: 'departments.add',
        meta: {
            title: 'Add a department',
            requiresAuth: true,
            hasPermission: 'create department'
        }
    },
    {
        path: '/departments/list',
        component: DepartmentsList,
        name: 'departments.list',
        meta: {
            title: 'Department List',
            requiresAuth: true,
        }
    },
    {
        path: '/departments/view/:departmentId',
        component: DepartmentsView,
        name: 'departments.view',
        meta: {
            title: 'View Department Details',
            requiresAuth: true,
        }
    },
    {
        path: '/departments/update/:departmentId',
        component: DepartmentsUpdate,
        name: 'departments.update',
        meta: {
            title: 'Edit Department Details',
            requiresAuth: true,
            hasPermission: 'update department'
        }
    },
];
