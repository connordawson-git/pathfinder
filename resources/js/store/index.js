import Vue from 'vue';
import Vuex from 'vuex';

import app from '@/store/App';
import user from '@/store/User';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
    }
});

export default store;
