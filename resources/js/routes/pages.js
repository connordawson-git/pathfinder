import Home from '@/layouts/Pages/Home.vue';
import PagesDashboard from '@/layouts/Pages/Dashboard.vue';

export default[
    {
        path: '/',
        component: Home,
        name: 'pages.home',
        meta: {
            title: 'Pathfinder'
        }
    },
    {
        path: '/dashboard',
        component: PagesDashboard,
        name: 'pages.dashboard',
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        }
    }
];
