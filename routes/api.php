<?php

// RequestクラスとRouteファサードのインポート
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// auth:sanctumミドルウェアを使用したルート定義
// Sanctumを通じた認証が必要
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // 認証済みユーザーの取得とレスポンス
    return $request->user();
});

/*
全体構成解説:
- ルートファサードとRequestクラスをインポート:
ルーティングとリクエスト処理のためのクラスをインポートしています。

- APIルートの定義:
APIルートはこのファイルで定義され、RouteServiceProviderによってロードされます。全てのAPIルートは"api"ミドルウェアグループに割り当てられます。

- auth:sanctumミドルウェアルート:
/userエンドポイントにGETリクエストを発行すると、auth:sanctumミドルウェアを通じて認証されたユーザーの情報がレスポンスとして返されます。
*/