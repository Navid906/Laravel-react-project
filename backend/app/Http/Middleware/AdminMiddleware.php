<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // CHECK IF USER ROLE IS ADMIN
        if ($request->user()->role !== 'admin') {

            return response()->json([

                'message' => 'Unauthorized'

            ], 403);
        }

        // ALLOW REQUEST
        return $next($request);
    }
}
