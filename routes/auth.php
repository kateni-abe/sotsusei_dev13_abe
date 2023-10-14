<?php

// 認証関連コントローラーインポート
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
// ルーティングファサードインポート
use Illuminate\Support\Facades\Route;

// ゲストユーザーミドルウェアグループ
// 未ログインのユーザーに対するルートをグループ化
Route::middleware('guest')->group(function () {
    // 登録ページルート
    // GETリクエストで/registerにアクセスすると登録ページを表示
    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');
    // 登録処理ルート
    // POSTリクエストで/registerにアクセスするとユーザー登録処理を実行
    Route::post('register', [RegisteredUserController::class, 'store']);

    // ログインページルート
    // GETリクエストで/loginにアクセスするとログインページを表示
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');
    // ログイン処理ルート
    // POSTリクエストで/loginにアクセスするとログイン処理を実行
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // パスワードリセットリクエストページルート
    // GETリクエストで/forgot-passwordにアクセスするとパスワードリセットリクエストページを表示
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');
    // パスワードリセットリクエスト処理ルート
    // POSTリクエストで/forgot-passwordにアクセスするとパスワードリセットリクエスト処理を実行
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    // パスワードリセットページルート
    // GETリクエストで/reset-password/{token}にアクセスするとパスワードリセットページを表示
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');
    // パスワードリセット処理ルート
    // POSTリクエストで/reset-passwordにアクセスするとパスワードリセット処理を実行
    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

// 認証ユーザーミドルウェアグループ
// ログイン済みのユーザーに対するルートをグループ化
Route::middleware('auth')->group(function () {
    // メール確認プロンプトルート
    // GETリクエストで/verify-emailにアクセスするとメール確認プロンプトを表示
    Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    // メール確認ルート
    // GETリクエストで/verify-email/{id}/{hash}にアクセスするとメールアドレスの確認処理を実行
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    // メール確認通知処理ルート
    // POSTリクエストで/email/verification-notificationにアクセスするとメール確認通知を送信
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    // パスワード確認ページルート
    // GETリクエストで/confirm-passwordにアクセスするとパスワード確認ページを表示
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                ->name('password.confirm');

    // パスワード確認処理ルート
    // POSTリクエストで/confirm-passwordにアクセスするとパスワード確認処理を実行
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // パスワード更新ルート
    // PUTリクエストで/passwordにアクセスするとパスワード更新処理を実行
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    // ログアウト処理ルート
    // POSTリクエストで/logoutにアクセスするとログアウト処理を実行
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

/* 
全体構成解説:
- 認証関連のコントローラーインポート: 必要な認証コントローラーをインポートしています。
- ゲストユーザーミドルウェアグループ: 未ログインのユーザーに対するルートを定義しています。登録、ログイン、パスワードリセットリクエスト、パスワードリセットの各ルートが含まれています。
- 認証ユーザーミドルウェアグループ: ログイン済みのユーザーに対するルートを定義しています。メール確認、パスワード確認、パスワード更新、ログアウトの各ルートが含まれています。
*/