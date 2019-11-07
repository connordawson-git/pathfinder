<template>
    <v-app>
        <app-header></app-header>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer class="footer hidden-sm-and-down" app>
            <v-row>
                <v-col
                    py-3
                    class="text-center"
                    cols="12">
                    &copy;{{ currentYear() }} <strong>Pathfinder</strong>
                </v-col>
            </v-row>
        </v-footer>
        <v-snackbar
            v-model="snackbar"
            :bottom="true"
            :color="snackbarTheme"
            :timeout="6000">
            {{ snackbarText }}
            <v-btn
                color="white"
                @click="snackbar = false"
                text>
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<style lang="scss">

</style>

<script>
    import { mapActions, mapState } from 'vuex';
    import store from '@/store';
    import AppHeader from '@/components/App/Header.vue'

    export default {
        components: {
            'app-header': AppHeader,
        },

        data() {
            return {
                snackbar: false,
                snackbarText: '',
                snackbarTheme: '',
            }
        },

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
            }),

            currentYear() {
                return (new Date()).getFullYear();
            }
        },

        created() {
            // Watch for any pushed snackbar messages in vuex.
            store.watch(state => state.app.snackbar, () => {

                const snackbar = store.state.app.snackbar;

                // If not an empty string, set the snackbar so it is displayed
                if (snackbar && snackbar.msg !== '') {
                    this.snackbar = true;
                    this.snackbarText = snackbar.msg;
                    this.snackbarTheme = snackbar.theme || 'accent';

                    // After displaying, clear the value in Vuex
                    this.setSnackbar({
                        msg: '',
                        theme: '',
                    });
                }
            });
        }
    }
</script>
