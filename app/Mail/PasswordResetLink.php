<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class PasswordResetLink extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The password reset token url.
     *
     * @var url
     */
    public $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $hostname = env("APP_URL");
        $this->url = $hostname . '/passwords/reset/' . $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.passwords.resetlink');
    }
}
