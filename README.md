## SPA Starter guide

A Single Page Application starter project

It is built with:

- Laravel 6
- Passport
- Spatie Permissions
- Sentry
- Vue 2.6
- Vuex 3
- Vue Router
- Vuetify 2
- Vee Validate 3

Features:

- Full Vue Single Page Application
- Token based login using Passport
- Front end layour built with Vuetify
- Ready made pages for Login / Forgot Password / Reset Password / Edit Profile / Change Password / Add a new User / Dashboard
- Contains User and Admin roles (if you seed your DB)

### Setup Guide

Clone the repo locally `git clone git@gitlab.com:contentdiscovered/spa-starter.git folder-name`

Delete the hidden folder .git

Duplicate .env.example to .env and fill as needed

Create a new empty MySQL DB with a new user (or use root)

`composer install`

create the APP_KEY `php artisan key:generate`

`php artisan migrate --seed`
This will create an admin account with the password “password”

`php artisan passport:install`

Open /resources/js/app.js
	- Change Vuetify’s Theme colours
	- Change the hardcoded page title in the  “router.beforeEach” block

Open /resources/js/components/App/Header.vue 
	- change the hardcoded site title in the <v-app-bar>

`yarn install`

`yarn watch`

and finally `git init` to start your git repo