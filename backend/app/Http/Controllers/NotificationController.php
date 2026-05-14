<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // GET NOTIFICATIONS
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([], 401);
        }

        return response()->json(
            $user->notifications->map(function ($n) {
                return [
                    'id' => $n->id,
                    'message' => $n->data['message'] ?? 'No message',
                    'read' => $n->read_at !== null,
                    'created_at' => $n->created_at,
                ];
            })
        );
    }

    // MARK SINGLE AS READ
    public function markAsRead($id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $notification = $user->notifications
            ->where('id', $id)
            ->first();

        if ($notification) {
            $notification->markAsRead();
        }

        return response()->json(['ok' => true]);
    }

    // MARK ALL AS READ
    public function markAllAsRead()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->unreadNotifications->markAsRead();

        return response()->json(['ok' => true]);
    }
}
