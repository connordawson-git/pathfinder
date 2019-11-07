<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title>Reset Your Password</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver ref="form" slim>
                            <v-form>
                                <ValidationProvider mode="lazy" name="email" rules="required|email" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Email"
                                        ref="email"
                                        prepend-icon="mdi-email"
                                        v-model="form.email"
                                        :error-messages="errors"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider name="password" rules="required" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="New Password"
                                        prepend-icon="mdi-lock"
                                        ref="password"
                                        v-model="form.password"
                                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        :error-messages="errors"
                                        :type="showPassword ? 'text': 'password'"
                                        @click:append="showPassword = !showPassword"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider mode="lazy" name="password confirmation" rules="required|confirmed:password" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Confirm Password"
                                        prepend-icon="mdi-lock-open"
                                        v-model="form.password_confirmation"
                                        :append-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
                                        :error-messages="errors"
                                        :type="showPasswordConfirmation ? 'text': 'password'"
                                        @click:append="showPasswordConfirmation = !showPasswordConfirmation"
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
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            :loading="saving"
                            :disabled="saving"
                            @click="resetPassword">
                            Reset
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
</style>

<script>
    import { mapActions } from 'vuex';
    import store from '@/store';
    import Password from '@/api/Password.js';
    import formHelpers from '@/mixins/formHelpers';

    export default {
        mixins: [ formHelpers ],

        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    password_confirmation: '',
    				token: this.$route.params.token
    			},
                saving: false,
                showPassword: false,
                showPasswordConfirmation: false
            }
        },

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
            }),

            /**
             * Posts the form to reset a User's password after validation
             *
             * @return {void}
             */
            resetPassword() {
                this.$refs.form.validate().then(valid => {
                    if (valid) {
                        this.resetServerError();
                        this.saving = true;

        				Password.reset(this.form)
                            .then (({ data }) => {
                                if (data.password_reset) {
                                    Auth.login(data.token, data.user);

                                    this.setSnackbar({
                                        msg: 'Your password has been reset!',
                                        theme: 'success',
                                    });

                                    this.$router.push({ name: 'pages.dashboard' });
                                    this.saving = false;
                                }
        					}).catch((error) => {
                                // Check for server validation errors - if none log the error
                                if(!this.serverValidationErrors()) {
                                    console.log(error);
                                };
                                this.saving = false;
                            });
                    }
                });
            }
        }
    }
</script>
