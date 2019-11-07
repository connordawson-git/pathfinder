import PasswordsRequest from '@/layouts/Passwords/Request.vue';
import PasswordsReset from '@/layouts/Passwords/Reset.vue';

export default [
    {
        path: '/passwords/request',
        component: PasswordsRequest,
        name: 'passwords.request',
        meta: {
            title: 'Request New Password'
        }
    },
    {
        path: '/passwords/reset/:token',
        component: PasswordsReset,
        name: 'passwords.reset',
        meta: {
            title: 'Reset Password'
        }
    }
];
