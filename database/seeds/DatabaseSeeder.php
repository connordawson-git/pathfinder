<?php

use App\Permission;
use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Default Roles
        $admin = Role::create(['guard_name' => 'api', 'name' => 'admin']);
        $user = Role::create(['guard_name' => 'api', 'name' => 'user']);

        // Default User Permissions
        $userPermissions = array(
        );
        $user->syncPermissions($userPermissions);


        // Default Admin Permissions
        $adminPermissions = $userPermissions;
        array_push(
            $adminPermissions,
            Permission::create(['guard_name' => 'api', 'name' => 'create user']),
            Permission::create(['guard_name' => 'api', 'name' => 'update user']),
            Permission::create(['guard_name' => 'api', 'name' => 'delete user'])
        );
        $admin->syncPermissions($adminPermissions);

        // Create the developers account
        $devAdmin = User::create([
            'name' => 'Admin',
            'email' => 'admin@email.com',
            'password' => \Hash::make('password'),
        ]);

        $devAdmin->assignRole('admin');

        $this->command->info('#####');
        $this->command->info('User created -name=Admin -email=admin@email.com -password=password');
        $this->command->info('#####');
    }
}
