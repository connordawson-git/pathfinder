
<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="8">
                <v-card>
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title><v-icon>mdi-account-plus</v-icon> Add a Department</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver ref="form" slim>
                            <v-form>
                                <v-row>
                                    <v-col cols="12">
                                        <ValidationProvider v-slot="{ errors }" name="department" rules="required" slim>
                                            <v-text-field
                                                v-model="form.department"
                                                label="Department"
                                                :error-messages="errors"
                                                required />
                                        </ValidationProvider>
                                    </v-col>
                                    <v-alert
                                        transition="scale-transition"
                                        type="error"
                                        :value="error"
                                        outlined>
                                        {{ errorMsg }}
                                    </v-alert>
                                </v-row>
                            </v-form>
                        </ValidationObserver>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            text
                            @click="clearForm">
                            Clear
                        </v-btn>
                        <v-spacer />
                        <v-btn
                            color="secondary"
                            :disabled="saving"
                            :loading="saving"
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
    import Department from '@/api/Department.js';
    import formHelpers from '@/mixins/formHelpers';

    export default {
        components: {
        },

        mixins: [formHelpers],

        data: () => ({
            form: {
                department: ''
            },
            saving: false,
        }),

        computed: {
            ...mapGetters({
            }),
        },


        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar'
            }),

            /**
             * Posts the form to create a new Department after validation
             *
             * @return {void}
             */
            add() {
                this.$refs.form.validate().then(valid => {
                    if (valid) {
                        this.resetServerError();
                        this.saving = true;

                        Department.create(this.form)
                            .then (({ data }) => {
                                this.clearForm();

                                this.setSnackbar({
                                    msg: 'The Department has been created',
                                    theme: 'success',
                                });

                                this.saving = false;
                            }).catch((error) => {
                                if(!this.serverValidationErrors()) {
                                    console.log(error);
                                }
                                this.saving = false;
                            });
                    }
                });
            },
        },
    }
</script>
