<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

use App\Notifications\ProfileUpdatedNotification;

class UserController extends Controller
{
    // GET ALL USERS
    public function index()
    {
        return response()->json(

            User::latest()->get()
        );
    }

    // GET SINGLE USER
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json($user);
    }

    // CREATE USER
    public function store(Request $request)
    {
        $request->validate([

            'name' => 'required',

            'email' => 'required|email|unique:users',

            'password' => 'required|min:6',

            'role' => 'required|in:admin,user',
        ]);

        $user = User::create([

            'name' => $request->name,

            'email' => $request->email,

            'phone' => $request->phone,

            'address' => $request->address,

            'role' => $request->role,

            'password' => Hash::make(
                $request->password
            ),
        ]);

        return response()->json([

            'message' => 'User created successfully',

            'user' => $user
        ]);
    }

    // UPDATE USER
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([

            'name' => 'required',

            'email' =>
            'required|email|unique:users,email,' . $id,

            'role' => 'required|in:admin,user',
        ]);

        $user->update([

            'name' => $request->name,

            'email' => $request->email,

            'phone' => $request->phone,

            'address' => $request->address,

            'role' => $request->role,
        ]);

        // SEND NOTIFICATION TO ADMINS
        $admins = User::where(
            'role',
            'admin'
        )->get();

        foreach ($admins as $admin) {

            $admin->notify(

                new ProfileUpdatedNotification($user)
            );
        }

        return response()->json([

            'message' =>
            'User updated successfully',

            'user' => $user
        ]);
    }

    // DELETE USER
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([

            'message' =>
            'User deleted successfully'
        ]);
    }
}
