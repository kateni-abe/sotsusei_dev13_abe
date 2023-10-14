// 必要なライブラリとコンポーネントをインポートします
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Toggle from "@/Components/Toggle";
import { useForm, usePage } from "@inertiajs/react"; // usePageをインポートします
import { Transition } from "@headlessui/react";

// `UpdateUserDetailsForm` コンポーネントをエクスポートします。
export default function UpdateUserDetailsForm({ className = "" }) {
    // `usePage` フックを使用して userDetails オブジェクトを取得し、デフォルト値を設定します
    const userDetails = usePage().props.userDetails || {};

    // `useForm` フックを使ってフォームのデータとエラーを管理します
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            icon: userDetails.icon || "", // ユーザーのアイコンを設定します
            birthdate: userDetails.birthdate || "", // ユーザーの生年月日を設定します
            birthplace: userDetails.birthplace || "", // ユーザーの出身地を設定します
            company: userDetails.company || "", // ユーザーの会社名を設定します
            position: userDetails.position || "", // ユーザーの役職を設定します
            industry: userDetails.industry || "", // ユーザーの職種を設定します
            hobby: userDetails.hobby || "", // ユーザーの趣味を設定します
            strengths: userDetails.strengths || "", // ユーザーの得意なことを設定します
            weaknesses: userDetails.weaknesses || "", // ユーザーの苦手なことを設定します
            phone_number: userDetails.phone_number || "", // ユーザーの電話番号を設定します
            facebook_account: userDetails.facebook_account || "", // ユーザーのFacebookアカウントを設定します
            instagram_account: userDetails.instagram_account || "", // ユーザーのInstagramアカウントを設定します
            x_account: userDetails.x_account || "", // ユーザーのTwitterアカウントを設定します
            line_id: userDetails.line_id || "", // ユーザーのLINE IDを設定します
            // 各公開/非公開フラグ
            icon_public: userDetails.icon_public || false,
            birthdate_public: userDetails.birthdate_public || false,
            birthplace_public: userDetails.birthplace_public || false,
            company_public: userDetails.company_public || false,
            position_public: userDetails.position_public || false,
            industry_public: userDetails.industry_public || false,
            hobby_public: userDetails.hobby_public || false,
            strengths_public: userDetails.strengths_public || false,
            weaknesses_public: userDetails.weaknesses_public || false,
            phone_number_public: userDetails.phone_number_public || false,
            facebook_account_public:
                userDetails.facebook_account_public || false,
            instagram_account_public:
                userDetails.instagram_account_public || false,
            x_account_public: userDetails.x_account_public || false,
            line_id_public: userDetails.line_id_public || false,
        });

    // ユーザーの詳細情報を更新する関数を定義します
    const updateUserDetails = (e) => {
        e.preventDefault(); // フォームのデフォルトの送信動作をキャンセルします

        // ユーザーの詳細情報更新リクエストを送信します
        patch(route("user.details.update"), {
            preserveScroll: true,
        });
    };

    return (
        // セクション要素を作成し、クラス名を適用します
        <section className={className}>
            {/* ヘッダー要素を作成し、タイトルと説明テキストを表示します */}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    ユーザー詳細情報
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    以下の情報を更新してください。
                    <br />
                    情報を公開に設定すると、マイカードへ表示されます。
                </p>
            </header>
            {/* フォーム要素を作成し、onSubmitイベントハンドラを設定します */}
            <form onSubmit={updateUserDetails} className="mt-6 space-y-6">
                {/* 各種情報入力フィールドを作成します */}

                {/* ユーザーアイコン */}
                <div>
                    <InputLabel htmlFor="icon" value="ユーザーアイコン" />
                    <TextInput
                        id="icon"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("icon", e.target.files[0])}
                        accept="image/*"
                    />
                    <Toggle
                        id="icon_public"
                        checked={data.icon_public}
                        onChange={(e) =>
                            setData("icon_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.icon} className="mt-2" />
                </div>

                {/* 生年月日 */}
                <div>
                    <InputLabel htmlFor="birthdate" value="生年月日" />
                    <TextInput
                        id="birthdate"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.birthdate}
                        onChange={(e) => setData("birthdate", e.target.value)}
                    />
                    <Toggle
                        id="birthdate_public"
                        checked={data.birthdate_public}
                        onChange={(e) =>
                            setData("birthdate_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.birthdate} className="mt-2" />
                </div>

                {/* 出身地 */}
                <div>
                    <InputLabel htmlFor="birthplace" value="出身地" />
                    <TextInput
                        id="birthplace"
                        className="mt-1 block w-full"
                        value={data.birthplace}
                        onChange={(e) => setData("birthplace", e.target.value)}
                    />
                    <Toggle
                        id="birthplace_public"
                        checked={data.birthplace_public}
                        onChange={(e) =>
                            setData("birthplace_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.birthplace} className="mt-2" />
                </div>

                {/* 会社名 */}
                <div>
                    <InputLabel htmlFor="company" value="会社名" />
                    <TextInput
                        id="company"
                        className="mt-1 block w-full"
                        value={data.company}
                        onChange={(e) => setData("company", e.target.value)}
                    />
                    <Toggle
                        id="company_public"
                        checked={data.company_public}
                        onChange={(e) =>
                            setData("company_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.company} className="mt-2" />
                </div>

                {/* 役職 */}
                <div>
                    <InputLabel htmlFor="position" value="役職" />
                    <TextInput
                        id="position"
                        className="mt-1 block w-full"
                        value={data.position}
                        onChange={(e) => setData("position", e.target.value)}
                    />
                    <Toggle
                        id="position_public"
                        checked={data.position_public}
                        onChange={(e) =>
                            setData("position_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.position} className="mt-2" />
                </div>

                {/* 職種 */}
                <div>
                    <InputLabel htmlFor="industry" value="職種" />
                    <TextInput
                        id="industry"
                        className="mt-1 block w-full"
                        value={data.industry}
                        onChange={(e) => setData("industry", e.target.value)}
                    />
                    <Toggle
                        id="industry_public"
                        checked={data.industry_public}
                        onChange={(e) =>
                            setData("industry_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.industry} className="mt-2" />
                </div>

                {/* 趣味 */}
                <div>
                    <InputLabel htmlFor="hobby" value="趣味" />
                    <TextInput
                        id="hobby"
                        className="mt-1 block w-full"
                        value={data.hobby}
                        onChange={(e) => setData("hobby", e.target.value)}
                    />
                    <Toggle
                        id="hobby_public"
                        checked={data.hobby_public}
                        onChange={(e) =>
                            setData("hobby_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.hobby} className="mt-2" />
                </div>

                {/* 得意なこと */}
                <div>
                    <InputLabel htmlFor="strengths" value="得意なこと" />
                    <TextInput
                        id="strengths"
                        className="mt-1 block w-full"
                        value={data.strengths}
                        onChange={(e) => setData("strengths", e.target.value)}
                    />
                    <Toggle
                        id="strengths_public"
                        checked={data.strengths_public}
                        onChange={(e) =>
                            setData("strengths_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.strengths} className="mt-2" />
                </div>

                {/* 苦手なこと */}
                <div>
                    <InputLabel htmlFor="weaknesses" value="苦手なこと" />
                    <TextInput
                        id="weaknesses"
                        className="mt-1 block w-full"
                        value={data.weaknesses}
                        onChange={(e) => setData("weaknesses", e.target.value)}
                    />
                    <Toggle
                        id="weaknesses_public"
                        checked={data.weaknesses_public}
                        onChange={(e) =>
                            setData("weaknesses_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.weaknesses} className="mt-2" />
                </div>

                {/* 電話番号 */}
                <div>
                    <InputLabel htmlFor="phone_number" value="電話番号" />
                    <TextInput
                        id="phone_number"
                        className="mt-1 block w-full"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData("phone_numbers", e.target.value)
                        }
                    />
                    <Toggle
                        id="phone_number_public"
                        checked={data.phone_number_public}
                        onChange={(e) =>
                            setData("phone_number_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError
                        message={errors.phone_number}
                        className="mt-2"
                    />
                </div>

                {/* facebook */}
                <div>
                    <InputLabel htmlFor="facebook_account" value="facebook" />
                    <TextInput
                        id="facebook_account"
                        className="mt-1 block w-full"
                        value={data.facebook_account}
                        onChange={(e) =>
                            setData("facebook_account", e.target.value)
                        }
                    />
                    <Toggle
                        id="facebook_account_public"
                        checked={data.facebook_account_public}
                        onChange={(e) =>
                            setData("facebook_account_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError
                        message={errors.facebook_account}
                        className="mt-2"
                    />
                </div>

                {/* Instagram */}
                <div>
                    <InputLabel htmlFor="instagram_account" value="Instagram" />
                    <TextInput
                        id="instagram_account"
                        className="mt-1 block w-full"
                        value={data.instagram_account}
                        onChange={(e) =>
                            setData("instagram_account", e.target.value)
                        }
                    />
                    <Toggle
                        id="instagram_account_public"
                        checked={data.instagram_account_public}
                        onChange={(e) =>
                            setData(
                                "instagram_account_public",
                                e.target.checked
                            )
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError
                        message={errors.instagram_account}
                        className="mt-2"
                    />
                </div>

                {/* X */}
                <div>
                    <InputLabel htmlFor="x_account" value="X(twitter)" />
                    <TextInput
                        id="x_account"
                        className="mt-1 block w-full"
                        value={data.x_account}
                        onChange={(e) => setData("x_account", e.target.value)}
                    />
                    <Toggle
                        id="x_account_public"
                        checked={data.x_account_public}
                        onChange={(e) =>
                            setData("x_account_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.x_account} className="mt-2" />
                </div>

                {/* LINE */}
                <div>
                    <InputLabel htmlFor="line_id" value="LINE" />
                    <TextInput
                        id="line_id"
                        className="mt-1 block w-full"
                        value={data.line_id}
                        onChange={(e) => setData("line_id", e.target.value)}
                    />
                    <Toggle
                        id="line_id_public"
                        checked={data.line_id_public}
                        onChange={(e) =>
                            setData("line_id_public", e.target.checked)
                        }
                        className="mt-1"
                        label="公開"
                    />
                    <InputError message={errors.line_id} className="mt-2" />
                </div>

                {/* 保存ボタンと成功メッセージを表示するフレックスコンテナを作成します */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            変更を保存しました
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
