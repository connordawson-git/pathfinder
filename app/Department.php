<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    /**
     * The attributes that are mass fillable
     * 
     * @var array
     */
    protected $fillable = [
        'department'
    ];

    /** 
     * Get the users in a department.
     */
    public function user() {
        return $this->hasMany('App\User');
    }
}
