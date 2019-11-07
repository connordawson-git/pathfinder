
<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title><v-icon left>mdi-lock-plus</v-icon>Change Your Password</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver ref="form" slim>
                            <v-form>
                                <ValidationProvider name="current password" rules="required" vid="current_password" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Current Password"
                                        prepend-icon="mdi-lock-outline"
                                        v-model="form.current_password"
                                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        :error-messages="errors"
                                        :type="showPassword ? 'text': 'password'"
                                        @click:append="showPassword = !showPassword"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider name="new password" rules="required" vid="new_password" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="New Password"
                                        prepend-icon="mdi-lock-open"
                                        v-model="form.new_password"
                                        :append-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                        :error-messages="errors"
                                        :type="showNewPassword ? 'text': 'password'"
                                        @click:append="showNewPassword = !showNewPassword"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider mode="lazy" name="new password" rules="required|confirmed:new_password" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Confirm New Password"
                                        prepend-icon="mdi-lock"
                                        v-model="form.new_password_confirmation"
                                        :append-icon="showNewPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
                                        :error-messages="errors"
                                        :type="showNewPasswordConfirmation ? 'text': 'password'"
                                        @click:append="showNewPasswordConfirmation = !showNewPasswordConfirmation"
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
                        <v-btn :to="{ 'name': 'users.edit-profile' }" text>Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            :loading="saving"
                            :disabled="saving"
                            @click="changePassword">
                            Save
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
    import User from '@/api/User.js';
    import formHelpers from '@/mixins/formHelpers';

    export default {
        mixins: [formHelpers],

        data: () => ({
            form: {
                current_password: '',
                new_password: '',
                new_password_confirmation: '',
            },
            saving: false,
            showPassword: false,
            showNewPassword: false,
            showNewPasswordConfirmation: false,
        }),

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
            }),

            /**
             * Posts the form to change a User's password after validation
             *
             * @return {void}
             */
            changePassword() {
                this.$refs.form.validate().then(valid => {
                    if (valid) {
                        this.resetServerError();
                        this.saving = true;

        				User.changePassword(this.form)
                            .then (({ data }) => {
                                if (data.password_changed) {
                                    this.setSnackbar({
                                        msg: 'Your password has been changed',
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
