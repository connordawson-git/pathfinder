<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title>Request New Password</v-toolbar-title>
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
                        <v-btn @click="$router.go(-1)" text>Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            :loading="saving"
                            :disabled="saving"
                            @click="requestPassword">
                            Request
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

        data: () => ({
            form: {
                email: ''
            },
            saving: false
        }),

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
            }),

            /**
             * Requests a new password reset form via an Axios request after validation.
             *
             * @return {void}
             */
            requestPassword() {
                this.$refs.form.validate().then(valid => {
                    if (valid) {
                        this.saving = true;

        				Password.request(this.form)
                            .then (({ data }) => {
                                if (data.success) {
                                    this.setSnackbar({
                                        msg: 'The password reset form has been emailed to you',
                                        theme: 'success',
                                    });

                                    this.$router.push({ name: 'users.login' });
                                    this.saving = false;
                                }
        					}).catch((error) => {
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
