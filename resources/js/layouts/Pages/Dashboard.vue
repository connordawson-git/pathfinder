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
            <v-row justify="center">
                <v-col  cols="12" sm="9" md="6" lg="3">
                    <v-card class="fill-height title-highlight" :to="{ 'name': 'users.add' }">
                        <v-img
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200"
                            max-height="200"
                            src="https://images.pexels.com/photos/533189/pexels-photo-533189.jpeg?cs=srgb&dl=chalk-company-conceptual-533189.jpg&fm=jpg"
                            width="auto"
                        >
                            <v-card-title class="align-end py-0">
                                <span class="title">
                                    <v-icon dark pb-3>mdi-account-plus</v-icon>
                                    Add User
                                </span>
                            </v-card-title>
                        </v-img>
                    </v-card>
                    </v-col>
                    <v-col  cols="12" sm="9" md="6" lg="3">
                    <v-card class="fill-height title-highlight" :to="{ 'name': 'departments.add' }">
                        <v-img
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200"
                            max-height="200"
                            src="https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            width="auto"
                        >
                            <v-card-title class="align-end py-0">
                                <span class="title">
                                    <v-icon dark pb-3>mdi-sitemap</v-icon>
                                    Add Department
                                </span>
                            </v-card-title>
                        </v-img>
                    </v-card>
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
