export default {
    auth: {
        token: null,
        user: {
            name: null,
            user_role: null
        },
        authenticated: false,
    },
    error: null,
    last_scope: null, // The Vee Validate scope of the last axios call
    loading: false,
    saving: false,
    snackbar: null,
    validation_errors: null
}
