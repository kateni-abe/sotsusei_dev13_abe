<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as AuthUser;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'unique_token',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function userDetails()
    {
        return $this->hasOne(UserDetails::class);
    }

    /**
     * Get the users that the user is following.
     */
    public function follows(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followee_id');
    }

    /**
     * Follow a user.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function follow(AuthUser $user): void
    {
        if ($this->id !== $user->id) {
            $this->follows()->syncWithoutDetaching([$user->id]);
        }
    }

    /**
     * Unfollow a user.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function unfollow(User $user): void
    {
        $this->follows()->detach($user->id);
    }
}