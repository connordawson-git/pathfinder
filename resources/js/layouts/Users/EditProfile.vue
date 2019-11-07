<template>
    <v-container fluid>
        <app-loading :loading="loading"></app-loading>
        <v-row v-if="!loading" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-6">
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title><v-icon left>mdi-account-edit</v-icon>Edit your Profile</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver ref="form" slim>
                            <v-form>
                                <ValidationProvider name="name" rules="required" v-slot="{ errors }" slim>
                                    <v-text-field
                                        placeholder="Name"
                                        prepend-icon="mdi-account"
                						v-model="form.name"
                						:error-messages="errors"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider mode="lazy" name="email" rules="required|email" v-slot="{ errors }" slim>
                                    <v-text-field
                                        placeholder="Email"
                                        prepend-icon="mdi-email"
                						v-model="form.email"
                						:error-messages="errors"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <v-alert
                                    outlined
                                    class="mb-3"
                                    transition="scale-transition"
                                    type="error"
                                    :value="error">
                                    {{ errorMsg }}
                                </v-alert>
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :to="{ 'name': 'users.change-password' }" text>Change Password</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            :loading="saving"
                            :disabled="saving"
                            @click="formSubmit">
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
    import AppLoading from '@/components/App/Loading.vue';
    import formHelpers from '@/mixins/formHelpers';

    export default {
        mixins: [formHelpers],

        components: {
            'app-loading': AppLoading,
        },

        data() {
            return {
                form: {
                    email: null,
                    id: null,
                    name: null,
                },
                active: false,
                contactEdited: false,
                loading: true,
                saving: false,
                scope: 'edit-profile',
                userProfile: {
                },
            }
        },

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
                updateProfile: 'app/updateProfile',
            }),

            /**
             * Submit the form to edit a Client Contact after validation
             *
             * @return {void}
             */
            formSubmit() {
                this.$refs.form.validate().then(valid => {
                    if (valid) {
                        this.resetServerError();
                        this.saving = true;

                        User.update(this.form)
                            .then(({ data }) => {
                                this.setSnackbar({
                                    msg: 'Your profile has been updated',
                                    theme: 'success',
                                });

                                // Update Vuex / Local Storage with Profile changes (new avatar / name)
                                let vUser = {};
                                vUser.name = data.name;

                                this.updateProfile(vUser).then(() => {
                                    this.saving = false;
                                });

                            }).catch((error) => {
                                if(!this.serverValidationErrors()) {
                                    console.log(error);
                                };
                                this.saving = false;
                            });
                    }
                });
            },
        },

        created() {
            User.loggedInUser()
                .then(({ data }) => {
                    this.userProfile = data;

                    // Convert nulls into empty strings or else FormData will post "null"
                    this.form.name = (this.userProfile.name === null) ? '' : this.userProfile.name;
                    this.form.id = (this.userProfile.id === null) ? '' : this.userProfile.id;
                    this.form.email = (this.userProfile.email === null) ? '' : this.userProfile.email;

                    this.loading = false;
                })
                .catch((error => {
                    console.log(error.statusText);
                }));
        },
    }
</script>
