<?php

// 名前空間の定義
namespace App\Models;

// 必要なクラスとトレイトのインポートです
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;  // Eloquentファクトリトレイト
use Illuminate\Foundation\Auth\User as Authenticatable;  // 認証可能ユーザークラス
use Illuminate\Notifications\Notifiable;  // 通知トレイト
use Laravel\Sanctum\HasApiTokens;  // Sanctum APIトークントレイト

// Userモデルの定義
class User extends Authenticatable
{
    // トレイトの使用
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * 一括代入可能な属性
     * 
     * この属性は、一括代入で値を設定可能
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',  // ユーザー名
        'email',  // メールアドレス
        'password',  // パスワード
        'unique_token',  // ユニークトークン
    ];

    /**
     * シリアライズ時に隠蔽する属性
     * 
     * この属性は、モデルの配列やJSON表現から隠蔽
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',  // パスワード
        'remember_token',  // リメンバートークン
    ];

    /**
     * 属性のキャスト
     * 
     * この属性は、モデルのデータ型変換
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',  // メール確認時刻
        'password' => 'hashed',  // ハッシュ化されたパスワード
    ];

    public function userDetails()
    {
        return $this->hasOne(UserDetails::class);
    }
}

/*
全体構成解説:
- インポート:
必要なクラスとトレイトをインポートしています。

- Userクラス:
Authenticatableクラスを拡張して、ユーザーモデルを定義しています。

- トレイトの使用:
HasApiTokens, HasFactory, Notifiableトレイトを使用しています。
これにより、APIトークン認証、ファクトリ機能、通知機能をユーザーモデルに追加しています。

- 属性定義:
$fillable, $hidden, $castsプロパティを定義し、それぞれ一括代入可能な属性、シリアライズ時に隠蔽する属性、属性のキャストを指定しています。
*/