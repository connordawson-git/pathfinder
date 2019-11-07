<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ##### AVAILABLE TO ALL VISITORS #####
Route::post('auth/login', 'Auth\LoginController@login')->name('login');
Route::get('auth/logout', 'Auth\LoginController@logout');


// ##### GUESTS ONLY #####
Route::middleware(['guest:api'])->group(function () {
    // AUTHENTICATION
    Route::post('passwords/request', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('passwords/reset', 'Auth\ResetPasswordController@reset')->name('password.reset');
});


// ##### LOGGED IN ONLY #####
Route::middleware(['auth:api'])->group(function () {
    // USERS
    Route::get('users/logged-in-user', 'UsersController@loggedInUser');
    Route::get('users/roles', 'UsersController@roles');
    Route::post('users/change-password', 'UsersController@changePassword');
    Route::put('users/{id}', 'UsersController@update');
    Route::get('departments/{id}', 'DepartmentsController@show');
});


Route::middleware(['role:admin'])->group(function () {
    // USERS
    Route::post('users', 'UsersController@create');
    // Departments
    Route::get('api/departments', 'DepartmentsController@all');
    Route::post('api/departments', 'DepartmentsController@create');
    Route::delete('api/departments/{id}', 'DepartmentsController@delete');
    Route::put('api/departments/{id}', 'DepartmentsController@update');
});
