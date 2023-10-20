<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function store(User $user)
    {
        auth()->user()->follow($user);

        return response()->json(['message' => 'Followed successfully']);
    }

    public function destroy(User $user)
    {
        auth()->user()->unfollow($user);

        return response()->json(['message' => 'Unfollowed successfully']);
    }
}