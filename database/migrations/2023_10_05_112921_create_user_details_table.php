<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();  // 自動インクリメントID
            $table->foreignId('user_id')->constrained()->onDelete('cascade');  // usersテーブルへの外部キー
            $table->string('icon')->nullable();  // ユーザーアイコンのファイル名
            $table->boolean('icon_public')->default(false);  // アイコンの公開/非公開フラグ
            $table->date('birthdate')->nullable();  // 生年月日
            $table->boolean('birthdate_public')->default(false);  // 生年月日の公開/非公開フラグ
            $table->string('birthplace')->nullable();  // 出身地
            $table->boolean('birthplace_public')->default(false);  // 出身地の公開/非公開フラグ
            $table->string('company')->nullable();  // 会社名
            $table->boolean('company_public')->default(false);  // 会社名の公開/非公開フラグ
            $table->string('position')->nullable();  // 役職・ポジション
            $table->boolean('position_public')->default(false);  // 役職・ポジションの公開/非公開フラグ
            $table->string('industry')->nullable();  // 業種
            $table->boolean('industry_public')->default(false);  // 業種の公開/非公開フラグ
            $table->string('hobby')->nullable();  // 趣味
            $table->boolean('hobby_public')->default(false);  // 趣味の公開/非公開フラグ
            $table->string('strengths')->nullable();  // 得意なこと
            $table->boolean('strengths_public')->default(false);  // 得意なことの公開/非公開フラグ
            $table->string('weaknesses')->nullable();  // 苦手なこと
            $table->boolean('weaknesses_public')->default(false);  // 苦手なことの公開/非公開フラグ
            $table->string('phone_number')->nullable();  // 電話番号
            $table->boolean('phone_number_public')->default(false);  // 電話番号の公開/非公開フラグ
            $table->string('facebook_account')->nullable();  // facebookアカウント
            $table->boolean('facebook_account_public')->default(false);  // facebookアカウントの公開/非公開フラグ
            $table->string('instagram_account')->nullable();  // Instagramアカウント
            $table->boolean('instagram_account_public')->default(false);  // Instagramアカウントの公開/非公開フラグ
            $table->string('x_account')->nullable();  // Xアカウント
            $table->boolean('x_account_public')->default(false);  // Xアカウントの公開/非公開フラグ
            $table->string('line_id')->nullable();  // LINE ID
            $table->boolean('line_id_public')->default(false);  // LINE IDの公開/非公開フラグ
            $table->timestamps();  // created_atとupdated_atタイムスタンプ
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_details');  // テーブルを削除する場合の処理
    }
}