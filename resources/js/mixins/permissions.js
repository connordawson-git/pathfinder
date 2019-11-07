// Collection of helper functions based around roles / permissions
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            authenticated: state => state.app.auth.authenticated,
            user: state => state.app.auth.user,
        }),

        isAdmin() {
            return (this.user.user_role == 'admin') ? true : false;
        },
    }
}
