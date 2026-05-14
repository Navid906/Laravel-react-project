<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

  // PROFILE
  Route::get('/profile', function (Request $request) {
    return $request->user();
  });

  // LOGOUT
  Route::post('/logout', [AuthController::class, 'logout']);

  /*
    |--------------------------------------------------------------------------
    | NOTIFICATIONS (FIXED - ONLY ONE SOURCE)
    |--------------------------------------------------------------------------
    */
  Route::get('/notifications', [NotificationController::class, 'index']);
  Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
  Route::put('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

  /*
    |--------------------------------------------------------------------------
    | MY PROFILE
    |--------------------------------------------------------------------------
    */
  Route::put('/my-profile/{id}', [UserController::class, 'update']);

  /*
    |--------------------------------------------------------------------------
    | ADMIN ROUTES
    |--------------------------------------------------------------------------
    */
  Route::middleware('admin')->group(function () {

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
  });
});
