<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ProfileUpdatedNotification extends Notification
{
    use Queueable;

    protected $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [

            'message' =>
            'User "' .
                $this->user->name .
                '" updated their profile information.',

            'user_id' => $this->user->id,

            'name' => $this->user->name,
        ];
    }
}
