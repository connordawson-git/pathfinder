<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    /**
     * ### (GET) SPA ###
     * Single Page App end point. The main entry into the application
     *
     * @return \Illuminate\Http\Response
     */
    public function spa()
    {
        $settings = [];
        //$settings = Setting::all()->pluck('value', 'key');

        //return view('app')->with(['settings' => $settings->toJson()]);
        return view('app')->with(['settings' => json_encode($settings)]);
    }
}
