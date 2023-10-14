<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_details';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'icon',
        'icon_public',
        'birthdate',
        'birthdate_public',
        'birthplace',
        'birthplace_public',
        'company',
        'company_public',
        'position',
        'position_public',
        'industry',
        'industry_public',
        'hobby',
        'hobby_public',
        'strengths',
        'strengths_public',
        'weaknesses',
        'weaknesses_public',
        'phone_number',
        'phone_number_public',
        'facebook_account',
        'facebook_account_public',
        'instagram_account',
        'instagram_account_public',
        'x_account',
        'x_account_public',
        'line_id',
        'line_id_public'
    ];

    /**
     * Get the user that owns the user details.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Save the user's details.
     *
     * @param  array  $details
     * @return bool
     */
    public function saveDetails(array $details)
    {
        // ここで$details配列のデータを検証や整形を行うことができます

        // モデルの属性を更新し、データベースに保存します
        return $this->update($details);
    }
}