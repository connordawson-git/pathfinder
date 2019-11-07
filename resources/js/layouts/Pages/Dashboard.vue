<template>
    <v-container fluid>
        <app-loading :loading="loading"></app-loading>
        <div v-if="!loading">
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-alert
                        color="secondary"
                        icon="mdi-account-heart"
                        dark
                        dismissible
                        prominent>
                        Welcome back <strong>{{ user.name }}</strong>!
                    </v-alert>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<style lang="scss">
</style>

<script>
    import { mapGetters } from 'vuex';
    import store from '@/store';
    import AppLoading from '@/components/App/Loading.vue';
    import permissions from '@/mixins/permissions';

    export default {
        mixins: [permissions],

        components: {
			'app-loading': AppLoading,
        },

        data(){
            return {
                loading: false
            }
        }
    }
</script>
