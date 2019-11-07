<template>
    <v-container fluid>
        <div >
            <v-alert
                outlined
                transition="scale-transition"
                type="error"
                :value="error">
                {{ errorMsg }}
            </v-alert>
            <v-row v-if="department.id" justify="center">
                <h1>{{ department.department }}</h1>
            </v-row>
        </div>
    </v-container>
</template>

<style lang="scss">
</style>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import formHelpers from '@/mixins/formHelpers.js';

    export default {
        components: {
        },

        mixins: [
            formHelpers
        ],

        data() {
            return {
                departmentId: this.$route.params.departmentId,
                loading: true,
            }
        },

        computed: {
            ...mapGetters ({
                department: 'department/current'
            }),
        },

        created() {
            this.getDepartment(this.departmentId).then(() => {
                this.loading = false;
            });
        },

        methods: {
            ...mapActions({
                getDepartment: 'department/getDetails'
            }),
        }
    }
</script>
