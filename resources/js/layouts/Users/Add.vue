<template>
    <v-container fluid>
        <app-loading :loading="loading"></app-loading>
        <v-row v-if="!loading" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card>
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title><v-icon>mdi-account-plus</v-icon> Add A User</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver ref="form" slim>
                            <v-form>
                                <ValidationProvider mode="lazy" name="email" rules="required|email" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Email"
                                        prepend-icon="mdi-email"
                                        v-model="form.email"
                                        :error-messages="errors"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider name="name" rules="required" v-slot="{ errors }" slim>
                                    <v-text-field
                                        label="Name"
                                        prepend-icon="mdi-account"
                                        v-model="form.name"
                                        :error-messages="errors"
                                        required>
                                    </v-text-field>
                                </ValidationProvider>
                                <ValidationProvider name="role" rules="required" vid="role_id" v-slot="{ errors }" slim>
                                    <v-select
                                        item-text="name"
                                        item-value="id"
                                        label="Role"
                                        prepend-icon="mdi-account-multiple"
                                        v-model="form.role_id"
                                        :error-messages="errors"
                                        :items="allRoles"
                                        required>
                                    </v-select>
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
                                <ValidationProvider mode="lazy" name="confirm password" rules="required|confirmed:password" v-slot="{ errors }" slim>
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
                                    transition="scale-transition"
                                    type="error"
                                    :value="error"
                                    outlined>
                                    {{ errorMsg }}
                                </v-alert>
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            text
                            @click="clearForm">
                            Clear
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="secondary"
                            :loading="saving"
                            :disabled="saving"
                            @click="add">
                            Add
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
    import { mapActions, mapGetters } from 'vuex';
    import store from '@/store';
    import User from '@/api/User.js';
    import AppLoading from '@/components/App/Loading.vue';
    import formHelpers from '@/mixins/formHelpers';

    export default {
        mixins: [formHelpers],

        components: {
            'app-loading': AppLoading,
        },

        data: () => ({
            form: {
                name: '',
                password: '',
                password_confirmation: '',
                role_id: null,
            },
            loading: true,
            saving: false,
            showPassword: false,
            showPasswordConfirmation: false
        }),

        computed: {
            ...mapGetters({
                allRoles: 'user/allRoles',
            }),
        },

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
                getRoles: 'user/getRoles',
            }),

            /**
             * Posts the form to create a new User after validation
             *
             * @return {void}
             */
            add() {
                this.$refs.form.validate().then(valid => {
                    if (valid) {
                        this.resetServerError();
                        this.saving = true;

                        User.create(this.form)
                            .then (({ data }) => {
                                this.clearForm();

                                this.setSnackbar({
                                    msg: 'The User ' + data.email + ' has been created',
                                    theme: 'success',
                                });

                                this.saving = false;
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
            this.getRoles().then(() => {
                this.loading = false;
            });
        }
    }
</script>
