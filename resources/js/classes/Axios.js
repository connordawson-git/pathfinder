import axios from 'axios';
import { vm } from '@/app.js';
import store from '@/store';

// Prefix all axios requests with /api/
const instance = axios.create({
    baseURL: '/api/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

instance.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${store.getters['app/accesstoken']}`;
        return config;
    }
);

// Catch and handle Response Status'
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Catch Unauthorised responses
        if (error.response.status === 401) {
            vm.$router.push({ name: 'users.login'} );
        // Catch Forbidden responses
        } else if (error.response.status === 403) {
            // Redirect to login (as long as we're not already on it)
            if(vm.$router.currentRoute.name !== 'users.login') {
                vm.$router.push({ name: 'users.login'} );
            }
        // Catch Validation failures and add them to Vee Validate
        } else if (error.response.status === 422) {

            // If just validation errors - add them to vuex for components to handle
            store.commit('app/SET_VALIDATION_ERRORS', {
                validation_errors: error.response.data.errors
            });

            // clear Vee Validate "Last Scope" in vuex
            store.commit('app/SET_LAST_SCOPE', null);

        // Catch Server Errors
        } else if (error.response.status === 500) {
            if (error.response.data.error) {
                store.commit('app/SET_ERROR', {
                    error: error.response.data.error
                });
            } else {
                store.commit('app/SET_ERROR', {
                    error: 'Sorry - an error occured making this request'
                });
            }
        } else {
            console.error(error)
        }
        return Promise.reject(error);
});

export default instance;
