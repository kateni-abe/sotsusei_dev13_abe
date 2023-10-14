<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard page.
     *
     * @param  Request  $request
     * @return \Inertia\Response
     */
    public function show(Request $request)
    {
        $user = $request->user();  // 現在認証されているユーザーを取得
        
        // userDetailsがnullの場合、空のオブジェクトを渡す
        $userDetails = $user->userDetails ? $user->userDetails : (object) [];
        
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'userDetails' => $userDetails,
        ]);
    }
}