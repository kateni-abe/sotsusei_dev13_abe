<?php

namespace App\Http\Controllers;

use App\Models\UserDetails;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class UserDetailsController extends Controller
{
    /**
     * Display the user's details edit form.
     *
     * @param  Request  $request
     * @return \Illuminate\View\View
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();  // 現在認証されているユーザーを取得

        return Inertia::render('Profile/Partials/UpdateUserDetailsForm', [
            'user' => $user,
            'userDetails' => $user->userDetails,
        ]);
    }


    /**
     * Update the user's details.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        $user = $request->user();  // 現在認証されているユーザーを取得
        $details = $request->all();  // リクエストデータを全て取得

        // userDetailsがnullの場合、新しいUserDetailsインスタンスを作成
        if ($user->userDetails === null) {
            $userDetails = new UserDetails;
            $userDetails->user_id = $user->id;
            $userDetails->save();
            $user->userDetails = $userDetails;
        }

        // UserDetailsモデルのsaveDetailsメソッドを呼び出して、ユーザーの詳細を更新
        $user->userDetails->fill($details);
    $user->userDetails->save();
    return Redirect::route('profile.edit');
    // return redirect()->route('user.details.edit')->with('status', 'Details updated successfully!');
    }
}