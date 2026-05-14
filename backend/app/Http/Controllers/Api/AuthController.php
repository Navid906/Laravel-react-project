<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $request->validate([

            'name' => 'required',

            'email' => 'required|email|unique:users',

            'password' => 'required|min:6',

        ]);

        $user = User::create([

            'name' => $request->name,

            'email' => $request->email,

            'password' => bcrypt($request->password),

            'role' => 'user',

        ]);

        return response()->json($user);
    }

    // LOGIN
    public function login(Request $request)
    {
        $request->validate([

            'email' => 'required|email',

            'password' => 'required'

        ]);

        $user = User::where('email', $request->email)->first();

        // CHECK PASSWORD
        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([

                'message' => 'Invalid Credentials'

            ], 401);
        }

        // CREATE TOKEN
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([

            'token' => $token,

            'user' => $user

        ]);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([

            'message' => 'Logged Out'

        ]);
    }
}
