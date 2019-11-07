<template>
    <v-container fluid>
        <app-loading :loading="loading" />
        <div v-if="!loading">
            <v-row justify="center">
                <h1 class="font-weight-light" color="primary">All Departments</h1>
            </v-row>
            <v-row justify="center">
                <v-col cols="12" md="10">
                    <v-card>
                        <v-card-title>
                            <v-spacer />
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                hide-details
                                label="Smart Search"
                                clearable
                                single-line />
                        </v-card-title>
                        <v-card-text>
                            <v-data-table
                                class="department-table"
                                :headers="headers"
                                :items="allDepartments"
                                :search="search"
                                :footer-props="{
                                    'items-per-page-options': rowsPerPage
                                }">
                                <template v-slot:item.department="props">
                                    <router-link
                                        class="department-table__link"
                                        :to="{
                                            name: 'departments.view',
                                            params: { departmentId: props.item.id }
                                        }">
                                        {{ props.item.department }}
                                    </router-link>
                                </template>
                                <template v-slot:item.department="props">
                                    {{ props.item.department }}
                                </template>
                                <template v-slot:item.actions="props">
                                    <v-menu
                                        transition="slide-y-transition"
                                        bottom
                                        left
                                        offset-y>
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                                icon
                                                small
                                                text
                                                :disabled="deleting === props.item.id"
                                                :loading="deleting === props.item.id"
                                                v-on="on">
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item >
                                                <v-list-item-action>
                                                    <v-icon color="error">mdi-delete</v-icon>
                                                </v-list-item-action>
                                                <v-list-item-content>

                                                    <button class="btn btn-danger" @click="onDelete(props.item)">Delete</button>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item
                                                :to="{
                                                    name: 'departments.update',
                                                    params: { departmentId: props.item.id }
                                                }">
                                                <v-list-item-action>
                                                    <v-icon color="success">mdi-pencil</v-icon>
                                                </v-list-item-action>
                                                <v-list-item-content>
                                                    <v-list-item-title>Edit Department</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<style lang="scss" scoped>
    .employee-table {
        &__link {
            text-decoration: none;
            font-weight:     bold;
        }
    }
</style>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import AppLoading from '@/components/App/Loading.vue';
    import permissions from '@/mixins/permissions';

    export default {
        components: {
            AppLoading
        },

        mixins: [permissions],

        data() {
            return {
                headers: [
                    { text: 'Department', value: 'department' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                loading: true,
                rowsPerPage: [10, 20, 50, { 'text': 'All', 'value': -1 }],
                search: null,
                deleting: null
            }
        },

        computed: {
            ...mapGetters({
                allDepartments: 'department/all'
            }),
        },

        created() {
            this.getAllDepartments()
            .then(() => {
                this.loading = false;
            }).catch(() => {
                alert('Failed to get Departments');
            });
        },

        methods: {
            ...mapActions({
                getAllDepartments: 'department/getAll',
                deleteDepartment: 'department/deleteDepartment',
                 setSnackbar: 'app/setSnackbar'
            }),

            onDelete(department) {
                if (!confirm(`Do you really want to delete department ${department.department}?`)) {
                    return;
                }
                this.deleting = department.id;
                this.deleteDepartment(department.id)
                    .then(this.getAllDepartments)
                    .then(() => {
                        this.setSnackbar({
                            msg: 'Department deleted',
                            theme: 'success',
                        });
                    })
                    .catch(() => {
                        this.setSnackbar({
                            msg: 'Failed to delete department',
                            theme: 'error',
                        });
                    })
                    .finally(() => this.deleting = null);
            }
        }
    }
</script>
