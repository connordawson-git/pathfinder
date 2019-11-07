/*      AUTH
 * The Auth class controls the authentication of the client with Laravel.
 * It is initialised on page load to log a User in should they already have a webstorage token.
 */
import store from '@/store';

class Auth
{
    // Called on first load of app.js
    constructor() {
        // Check local storage to see if already logged in.
        this.token = window.localStorage.getItem('token');

        if(this.token) {
            this.user = JSON.parse(window.localStorage.getItem('user'));

            this.login(this.token, this.user);
        }
    }

    /**
     * Sets up localStorage and Vuex with logged in details.
     * (Assumes all is ok until an actual server request is made - If details are bad you get 401'd to login page)
     *
     * @param {string} token
     * @param {JSON} user
     *
     * @return {void}
     */
    login(token, user) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));

        store.commit('app/SET_AUTH', {
            authenticated: true,
            token: token,
            user: user
        });
    }

    /**
     * Clears localStorage and Vuex of all logged in details.
     *
     * @return {void}
     */
    logout() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');

        store.commit('app/SET_AUTH_LOGOUT');
    }
}

export default Auth;
