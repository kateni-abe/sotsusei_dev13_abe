<?php

// コントローラーインポートだよ
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDetailsController;
use App\Http\Controllers\FollowController;

// アプリケーション基本クラス
use Illuminate\Foundation\Application;
use App\Models\User;

// ルーティングファサード
use Illuminate\Support\Facades\Route;
// Inertiaライブラリ
use Inertia\Inertia;




// ルートページルート
Route::get('/', function () {
    // Welcomeページレンダリング
    // ログイン、登録ルート確認
    // Laravel, PHPバージョン提供
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'show'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// 認証ミドルウェアグループ
Route::middleware('auth')->group(function () {
    // プロフィール編集ルート
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // プロフィール更新ルート
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // プロフィール削除ルート
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // プロフィール詳細編集ルート
    Route::get('user/details/edit', [UserDetailsController::class, 'edit'])->name('user.details.edit');
    // プロフィール詳細更新ルート
    Route::patch('user/details/update', [UserDetailsController::class, 'update'])->name('user.details.update');
});

// 認証ルートファイル
require __DIR__.'/auth.php';

Route::get('/mycard', function () {
    // Dashboardページレンダリング
    return Inertia::render('Mycard');
})
// 認証、検証ミドルウェア
->middleware(['auth', 'verified'])
// ルート名指定
->name('mycard');


Route::get('/user/{token}', function ($token) {
    $user = User::where('unique_token', $token)->firstOrFail();
    return Inertia::render('MakeFriends', ['user' => $user]);
});


Route::post('/follow/{user}', [FollowController::class, 'store'])->name('follow.store');
Route::delete('/unfollow/{user}', [FollowController::class, 'destroy'])->name('follow.destroy');




/*
ルート定義解説:
- ルートページルート:
ユーザーがルートURL('/')にアクセスしたとき、Welcomeページをレンダリングします。
ログインおよび登録ルートの存在を確認し、LaravelとPHPのバージョン情報を提供します。

- ダッシュボードルート: 認証および検証ミドルウェアを通過したユーザーのみがダッシュボード('/dashboard')にアクセスできます。
Dashboardページをレンダリングし、ルート名を'dashboard'として指定します。

- 認証ミドルウェアグループ: 認証されたユーザーのみがアクセスできるルートをグループ化します。
プロフィールの編集、更新、および削除のルートを定義し、それぞれProfileControllerのメソッドにマッピングします。

- 認証ルートファイル: 追加の認証関連のルート定義を含む'auth.php'ファイルをインクルードします。
これにより、ログイン、登録、パスワードリセットなどの認証関連のルートが提供されます。

*/