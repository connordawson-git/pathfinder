<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver ref="form" slim>
                            <v-form>
                                <ValidationProvider mode="lazy" name="email" rules="required|email" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Email"
                                        prepend-icon="mdi-account"
                                        v-model="form.email"
                                        :error-messages="errors"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider name="password" rules="required" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Password"
                                        prepend-icon="mdi-lock"
                                        v-model="form.password"
                                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        :error-messages="errors"
                                        :type="showPassword ? 'text': 'password'"
                                        @click:append="showPassword = !showPassword"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <v-alert
                                    outlined
                                    transition="scale-transition"
                                    type="error"
                                    :value="error">
                                    {{ errorMsg }}
                                </v-alert>
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :to="{ 'name': 'passwords.request' }" text>Forgot Password?</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            :loading="saving"
                            :disabled="saving"
                            @click="login">
                            Login
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss">
</style>

<script>
    import { mapActions } from 'vuex';
    import store from '@/store';
    import User from '@/api/User.js';
    import formHelpers from '@/mixins/formHelpers';

    export default {
        mixins: [formHelpers],

        data: () => ({
            form: {
                email: '',
                password: ''
            },
            saving: false,
            showPassword: false
        }),

        methods: {
            ...mapActions({
                setError: 'app/setError',
                setSnackbar: 'app/setSnackbar',
            }),

            /**
             * Posts the login form after validation. It will then add the token to Vuex and localstorage
             *
             * @return {void}
             */
            login() {
                this.$refs.form.validate().then(valid => {
                    if (valid) {
                        this.resetServerError();
                        this.saving = true;

                        User.login(this.form)
                            .then (({ data }) => {
                                if (data.logged_in) {
                                    this.setSnackbar({
                                        msg: 'Success - You have logged in!',
                                        theme: 'success',
                                    });

                                    Auth.login(data.token, data.user);
                                    this.$router.push({ name: 'pages.dashboard' });

                                    this.saving = false;
                                }
                            }).catch((error) => {
                                if (error.response.status === 403) {
                                    this.setError({
                                        error: 'Sorry - Your username / password combination was not recognised'
                                    });
                                    this.clearForm();
                                } else {
                                    // Check for server validation errors - if none log the error
                                    if(!this.serverValidationErrors()) {
                                        console.log(error);
                                    };
                                }

                                this.saving = false;
                            });
                    }
                });
            }
        }
    }
</script>
