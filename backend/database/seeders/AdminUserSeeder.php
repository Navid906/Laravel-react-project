<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'admin@example.com'
            ],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'phone' => '0123456789',
                'address' => 'Dhaka',
            ]
        );

        User::updateOrCreate(
            [
                'email' => 'JohnDoe@example.com'
            ],
            [
                'name' => 'Normal User',
                'password' => Hash::make('password'),
                'role' => 'user',
                'phone' => '01999999999',
                'address' => 'Dhaka',
            ]
        );
    }
}
