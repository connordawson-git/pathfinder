<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUser;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }


    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }


    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only('email', 'password');
    }


    /**
     * Log the User into the application.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginUser $request)
    {
        $credentials = $this->credentials($request);

        if ($this->guard()->attempt($credentials, $request->has('remember'))) {
            // grab the newly logged in user
            $user = User::where('email', $request->email)->first();

            $tokenName = 'PathFinder';

            $data['token'] = $user->createToken($tokenName)->accessToken;
            $data['logged_in'] = true;

            $data['user'] = (object) [
                'name' => $user->name,
                'user_role' => $user->getRoleNames()->first() // Should only have one role...
            ];

            return response()->json($data, $this->statusSuccess);
        }

        $error = "Sorry your username password combination is incorrect";
        return response()->json(['error' => $error], $this->statusForbidden);
    }


    /**
     * Log the user out of the application.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        if (Auth::guard('api')->user()) {
            $user = Auth::guard('api')->user()->token();
            $user->revoke();
        }

        return response()->json([
            'logged_out' => true,
            'message' => 'You have been successfully logged out'
        ], $this->statusSuccess);
    }
}
