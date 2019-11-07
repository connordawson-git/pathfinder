<template>
    <div>
        <v-navigation-drawer v-if="authenticated" v-model="menu" app clipped>
            <v-list>
                <v-list-item :to="{ 'name': 'pages.dashboard' }">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group
                prepend-icon="mdi-sitemap"
                no-action>
                    <template v-slot:activator>
                        <v-list-item>
                            <v-list-item-title>Departments</v-list-item-title>
                        </v-list-item>
                    </template>
                    <v-list-item  :to="{ 'name': 'departments.add' }">
                        <v-list-item-content>
                            <v-list-item-title>Add</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>mdi-plus-circle-outline</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                    <v-list-item :to="{ 'name': 'departments.list' }">
                        <v-list-item-content>
                            <v-list-item-title>List</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-group>
            </v-list>

        </v-navigation-drawer>
        <v-app-bar class="menu" color="primary" app dark fixed clipped-left>
            <v-app-bar-nav-icon v-if="authenticated" @click="menu = !menu"></v-app-bar-nav-icon>
            <router-link  :to="{ name: 'pages.home' }">
                <v-toolbar-title class="menu__text white--text pl-3 pr-4">Pathfinder</v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn text v-if="!authenticated" :to="{ name: 'users.login' }">Login</v-btn>
            </v-toolbar-items>
            <v-menu
                v-if="authenticated"
                transition="slide-y-transition"
                bottom
                left
                offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text>
                        <v-avatar class="mr-2" size="30px">
                            <v-icon color="white">mdi-account</v-icon>
                        </v-avatar> {{ user.name }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title><b>{{ user.name }}</b></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item v-if="isAdmin"  :to="{ 'name': 'users.add' }">
                        <v-list-item-action>
                            <v-icon>mdi-account-plus</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Add User</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item :to="{ 'name': 'users.edit-profile' }">
                        <v-list-item-action>
                            <v-icon>mdi-account-edit</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Edit Profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item :to="{ 'name': 'users.change-password' }">
                        <v-list-item-action>
                            <v-icon>mdi-lock</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Change Password</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<style lang="scss">
    .menu {
        a {
            text-decoration: none;
        }

        &__text{
            transition: all 0.2s;
            &:hover{
                opacity: 0.7;
            }
        }
    }
</style>

<script>
    import { mapActions, mapState } from 'vuex';
    import store from '@/store';
    import User from '@/api/User.js';
    import permissions from '@/mixins/permissions'

    export default {
        mixins: [permissions],

        components: {
        },

        data: () => ({
            menu: false
        }),

        methods: {
            ...mapActions({
                setSnackbar: 'app/setSnackbar',
            }),

            /**
             * Calls the Axios command to log a user out and then redirects to login page.
             *
             * @return {void}
             */
            logout() {
                User.logout()
                    .then(({data}) => {
    					if (data.logged_out) {
                            Auth.logout();
                            this.setSnackbar({
                                msg: 'You have been logged out.',
                                theme: 'success',
                            });
                            this.$router.push({ name: 'users.login' });
                        }
    				})
    				.catch(error => {
    					console.log('failed to log the user out: ' + error);
    				});
            }
        }
    }
</script>
