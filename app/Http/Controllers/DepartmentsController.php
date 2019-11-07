<?php

namespace App\Http\Controllers;

use App\Department;
use Illuminate\Http\Request;
use App\Http\Requests\CreateDepartment;
use App\Http\Requests\DeleteDepartment;
use App\Http\Requests\UpdateDepartment;

class DepartmentsController extends Controller
{
    /** (GET) ALL
     * retrieve all departments
     * 
     * @return \Illuminate\Http\Request
     */
    public function all(Request $request)
    {
        //Get all departments
        $departments= Department::all();

        return response()->json(['departments' => $departments], $this->statusSuccess);
    }
    
    /** (POST) Department
     * Add a new department
     * 
     * @return \Illuminate\Http\Request
    */
    public function create(CreateDepartment $request)
    {
        $department = Department::create([
            'department' => $request->department
        ]);
        return response()->json($department, $this->statusSuccess);
    }

    /**(DELETE) Delete
     * Delete a User
     * 
     * @return \Illuminate\Http\Request
     */

     public function delete($departmentId, DeleteDepartment $request)
     {
         $department = Department::findOrFail($departmentId);

         $department->delete();

         return response()->json('Department deleted', $this->statusSuccess);
     }

    /**(GET) Show
     * show a user by id
     * 
     * @return \Illuminate\Http\Request
     */

    public function show(Request $request)
    {
        $department = Department::where('id', $request->id)->first();

        if(!$department) {
            return response()->json([
                'error' => 'Could not find department'
            ], $this->statusFailed);
        }

        return response()->json(['department' => $department], $this->statusSuccess);
    }

    /**(PUT) update
     * update a user by id
     * 
     * @return \Illuminate\Http\Request
     */

    public function update($departmentId, UpdateDepartment $request)
    {
        if (!$department = Department::findorFail($departmentId)) {
            return response()->json([
                'error' => 'Department not found',
            ], 404);
        }
        $department->department = $request->department;

        if (!$department->save()) {
            return response()->json([
                'error' => 'Error whilst updating department',
            ], 500);
        }

        return response()->json($department, 200);
    }
}
