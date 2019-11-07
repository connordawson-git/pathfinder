import UsersAdd from '@/layouts/Users/Add.vue';
import UsersChangePassword from '@/layouts/Users/ChangePassword.vue';
import UsersEditProfile from '@/layouts/Users/EditProfile.vue';
import UsersLogin from '@/layouts/Users/Login.vue';

export default [
    {
        path: '/users/add',
        component: UsersAdd,
        name: 'users.add',
        meta: {
            title: 'Add a User',
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/users/change-password',
        component: UsersChangePassword,
        name: 'users.change-password',
        meta: {
            title: 'Change Password',
            requiresAuth: true
        }
    },
    {
        path: '/users/edit-profile',
        component: UsersEditProfile,
        name: 'users.edit-profile',
        meta: {
            title: 'Edit Profile',
            requiresAuth: true
        }
    },
    {
        path: '/users/login',
        component: UsersLogin,
        name: 'users.login',
        meta: {
            title: 'Login'
        }
    }
];
