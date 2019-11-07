<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUser;
use App\Http\Requests\ChangePassword;
use App\Http\Requests\UpdateUser;
use App\Http\Requests\DeleteUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * ### (GET) ALL ###
     * Retrieves all users
     *
     * @return \Illuminate\Http\Response
     */
    public function all(Request $request)
    {
        $users = User::with(['roles'])->get();

        return response()->json(['users' => $users], $this->statusSuccess);
    }


    /**
     * ### (POST) CHANGE PASSWORD ###
     * Save a users changed password
     *
     * @param  ChangePassword  $request
     * @return JSON
     */
    public function changePassword(ChangePassword $request)
    {
        $user = Auth::user();
        $user->password = Hash::make($request['new_password']);
        $user->save();

        $data['password_changed'] = true;

        // Return json
        return response()->json($data, $this->statusSuccess);
    }


    /**
     * ### (POST) CREATE ###
     * Add a new User to the application
     *
     * @return \Illuminate\Http\Response
     */
    public function create(CreateUser $request)
    {
        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request['password'])
        ]);

        $role = Role::where('id', $request->role_id)->first()->name;
        $user->assignRole($role);

        return response()->json($user, $this->statusSuccess);
    }


    /**
     * ### (DELETE) DELETE ###
     * Delete a User
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($userid, DeleteUser $request)
    {
        $user = User::find($userid);

        if (Auth::user()->id == $user->id) {
            return response()->json('You cannot delete yourself', $this->statusFailed);
        }

        $user->delete();

        return response()->json('User deleted', $this->statusSuccess);
    }


    /**
     * ### (GET) LOGGED IN USER ###
     * Returns all data for the logged in User
     *
     * @return \Illuminate\Http\Response
     */
    public function loggedInUser()
    {
        $user = Auth::user();

        return response()->json($user, $this->statusSuccess);
    }


    /**
     * ### (GET) ROLES ###
     * Returns all roles Users could have
     *
     * @return \Illuminate\Http\Response
     */
    public function roles()
    {
        $roles = Role::all();

        return response()->json(['roles' => $roles], $this->statusSuccess);
    }


    /**
     * ### (POST) UPDATE PROFILE ###
     * Updates the logged in Users profile
     *
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateUser $request)
    {
        $user = Auth::user();
        $user->email = $request->email;
        $user->name = $request->name;

        $user->save();

        return response()->json($user, $this->statusSuccess);
    }
}
