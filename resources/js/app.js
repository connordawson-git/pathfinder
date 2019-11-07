// Load Lodash
window._ = require('lodash');

// Load Vue
window.Vue = require('vue');

// Import all required plugins
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

// Pull in the App Config
const settingsData = document.getElementById('app').getAttribute('data-settings');
window.qt_settings = (settingsData)? JSON.parse(settingsData) : {};

// Load the plugins into Vue
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// Vuetify setup
// #########################################
// ### CHANGE ME - Vuetify Theme Colours ###
// #########################################
const opts = {
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: '#000',   // Dark Purple
                secondary: '#23AE84', // Green
                accent: '#63C3D1',    // light blue
                error: '#F3989B',     // pastel red
                info: '#2196F3',      // (default) blue
                success: '#4CAF50',   // (default) green
                warning: '#FB8C00'    // (default) yellow
            }
        },
        options: {
            customProperties: true,
        }
    }
};
Vue.use(Vuetify);

// import configuration files
import Auth from '@/classes/Auth';
import routes from '@/routes';
import store from '@/store';
import Base from '@/layouts/Base.vue';

window.Auth = new Auth();

// Set up the Router
const router = new VueRouter
({
    mode: 'history',
    routes
});

// Router filters - run before a page is loaded.
// Even if local data has been hacked to allow access - API calls will fail auth and redirect to login.
// #########################################
// ### CHANGE ME - Hardcoded Site titles ###
// #########################################
router.beforeEach((to, from, next) => {
    document.title = 'Pathfinder - ' + to.meta.title;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (window.localStorage.getItem('token') == null) {
            window.localStorage.setItem('requested_path', to.path);
            document.title = 'Pathfinder - Login';
            next({
                name: 'users.login',
            });
        } else {
            next();
        }
    }

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        let user = JSON.parse(window.localStorage.getItem('user'));

        if (!user.user_role || user.user_role != 'admin') {
            window.localStorage.setItem('requested_path', to.path);
            document.title = 'Pathfinder - Login';
            next({
                name: 'users.login',
            });
        } else {
            next();
        }
    }

    next();
});


export const vm = new Vue({
    el: '#app',
    router: router,
    render: h => h(Base),
    store: store,
    vuetify: new Vuetify(opts),
});
