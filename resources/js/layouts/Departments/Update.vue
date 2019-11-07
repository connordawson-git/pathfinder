
<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" sm="8">
                <v-card>
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title><v-icon>mdi-account-plus</v-icon>Update Department</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <ValidationObserver ref="form" slim>
                            <v-form>
                                <v-row>
                                    <v-col cols="12">
                                        <ValidationProvider v-slot="{ errors }" name="department" rules="required" slim>
                                            <v-text-field
                                                v-model="input.department"
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
                            @click="onUpdate">
                            Update
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
            input: {
                department: null,
                id: null
            },
            saving: false,
        }),

        computed: {
            ...mapGetters({
                department: 'department/current'
            }),
        },

        created() {
            this.getDepartment(this.$route.params.departmentId)
            .then(() => {
                this.input.id = this.department.id;
                this.input.department = this.department.department;
                this.loading = false;
            }).catch(() => {
                alert('woop');
            });
        },

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
                update: 'department/update',
                getDepartment: 'department/getDetails'
            }),

            /**
             * Posts the form to update a Department after validation
             *
             * @return {void}
             */
            onUpdate() {
                this.$refs.form.validate().then((valid) => {
                    if (!valid) {
                        return;
                    }
                    this.saving = true;
                    this.update(this.input)
                        .then(() => {
                            this.setSnackbar({
                                msg: 'Department updated',
                                theme: 'success',
                            });
                        })
                        .then(() => {
                            this.$router.push({ name: 'departments.list' })
                        })
                        .catch(() => {
                            this.setSnackbar({
                                msg: 'Failed to update Department',
                                theme: 'error',
                            });
                        })
                        .finally(() => this.saving = false);
                })
            },
        },
    }
</script>
