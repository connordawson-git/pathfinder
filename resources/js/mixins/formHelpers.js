import { mapActions } from 'vuex';
import store from '@/store';

export default {
    data: () => ({
        error: false,
        errorMsg: '',
    }),

    methods: {
        ...mapActions({
            resetError: 'app/resetError',
            resetValidationErrors: 'app/resetValidationErrors',
        }),

        /**
         * Checks for any Axios added server side validation errors
         * Injects them into the VeeValidate ValidationObserver
         *
         * @return {void}
         */
        serverValidationErrors() {
            if (store.state.app.validation_errors !== null) {
                this.$refs.form.setErrors(store.state.app.validation_errors);
                this.resetValidationErrors();
                return true;
            } else {
                return false;
            }
        },


        /**
         * Clears all VeeValidate and Vuetify errors
         *
         * @return {void}
         */
        clearForm() {
            // Clear all Vuetify errors - Assumes that a v-form component is the first child of the ValidationObserver
            this.$refs.form.$children[0].reset();

            // Wait for UI to stabilise and then reset VeeValidate errors
            requestAnimationFrame(() => {
                this.$refs.form.reset();
            });
        },


        /**
         * resets the generic error message
         *
         * @return {void}
         */
        resetServerError() {
            this.errorMsg = '';
            this.error = false;

            if (store.state.app.error !== null) {
                this.resetError();
            }
            if (store.state.app.validation_errors !== null) {
                this.resetValidationErrors();
            }
        },
    },

    created() {
        // When a form is loaded - clear out error messages
        if(store.state.app.error !== null) {
            this.resetError();
        }

        // Watch for an error message being added to Vuex. Most likely a 500 intercepted by Axios.
        store.watch(state => state.app.error, () => {
            const msg = store.state.app.error;

            // If not an empty string, set the values so it is displayed
            if(msg !== null) {
                this.error = true;
            } else {
                this.error = false;
            }

            this.errorMsg = msg;
        });
    }


}
