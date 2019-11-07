<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $statusSuccess = 200;
    public $statusUnauthorised = 401;
    public $statusForbidden = 403;
    public $statusFailed = 500;


    /**
     * ### GET TIMEZONE ###
     * Returns the users timezone (TEMP: assumes Europe/London until added to Settings page)
     *
     * @return     string        -timezone to display UTC timestamps in
     */
    public function getUsersTimezone()
    {
        return 'Europe/London';
    }
}
