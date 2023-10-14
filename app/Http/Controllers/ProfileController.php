<?php

// 名前空間の定義
namespace App\Http\Controllers;

// 必要なクラスとインターフェースのインポート
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

// ProfileControllerクラスの定義
class ProfileController extends Controller
{
    /**
     * ユーザーのプロフィールフォームを表示
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();  // 現在認証されているユーザーを取得
        $userDetails = $user->userDetails;  // ユーザー詳細情報を取得

        // Profile/Editビューのレンダリング
        // メール確認要件とセッションステータスを渡す
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $user,  // usersテーブルの情報
            'userDetails' => $userDetails,  // user_detailsテーブルの情報
        ]);
    }

    /**
     * ユーザーのプロフィール情報を更新
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // バリデーション済みのリクエストデータでユーザー情報を更新
        $request->user()->fill($request->validated());

        // メールアドレスが変更された場合、メール確認時刻をリセット
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        // ユーザー情報の保存
        $request->user()->save();

        // プロフィール編集ページへのリダイレクト
        return Redirect::route('profile.edit');
    }

    /**
     * ユーザーのアカウントを削除
     */
    public function destroy(Request $request): RedirectResponse
    {
        // パスワードのバリデーション
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        // ユーザーオブジェクトの取得
        $user = $request->user();

        // ログアウト処理
        Auth::logout();

        // ユーザーアカウントの削除
        $user->delete();

        // セッションの無効化とトークンの再生成
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // ルートページへのリダイレクト
        return Redirect::to('/');
    }
}

/*
全体構成解説:
- インポート: 必要なクラスとインターフェースをインポートしています。

- ProfileControllerクラス:
Controllerクラスを拡張してプロフィール関連のコントローラを定義しています。

- editメソッド:
ユーザーのプロフィールフォームを表示するためのメソッドです。
メール確認要件とセッションステータスをProfile/Editビューに渡しています。

- updateメソッド:
ユーザーのプロフィール情報を更新するためのメソッドです。
バリデーション済みのリクエストデータを使用してユーザー情報を更新し、必要に応じてメール確認時刻をリセットしています。

- destroyメソッド:
ユーザーのアカウントを削除するためのメソッドです。
パスワードのバリデーションを行い、ログアウト処理を実行した後、ユーザーアカウントを削除しています。最後にセッションを無効化し、ルートページにリダイレクトしています。
*/