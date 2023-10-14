// 必要なライブラリとコンポーネントをインポートします
import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

// `UpdatePasswordForm` コンポーネントをエクスポートします。このコンポーネントはパスワードの更新フォームを提供します。
export default function UpdatePasswordForm({ className = "" }) {
    // useRefを使ってパスワード入力フィールドの参照を作成します
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    // `useForm` フックを使ってフォームのデータとエラーを管理します
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    // パスワードを更新する関数を定義します
    const updatePassword = (e) => {
        e.preventDefault(); // フォームのデフォルトの送信動作をキャンセルします

        // パスワード更新リクエストを送信します
        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(), // 成功した場合、フォームをリセットします
            onError: (errors) => {
                // エラーが発生した場合、エラー処理を行います
                if (errors.password) {
                    reset("password", "password_confirmation"); // パスワードフィールドをリセットします
                    passwordInput.current.focus(); // パスワード入力フィールドにフォーカスを移動します
                }

                if (errors.current_password) {
                    reset("current_password"); // 現在のパスワードフィールドをリセットします
                    currentPasswordInput.current.focus(); // 現在のパスワード入力フィールドにフォーカスを移動します
                }
            },
        });
    };

    return (
        // セクション要素を作成し、クラス名を適用します
        <section className={className}>
            {/**ヘッダー要素を作成し、タイトルと説明テキストを表示します */}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    パスワード
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    パスワードは8文字以上で登録してください。
                </p>
            </header>
            {/**フォーム要素を作成し、onSubmitイベントハンドラを設定します */}
            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                {/**現在のパスワード入力フィールドを作成します */}

                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="現在のパスワード"
                    />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />
                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>
                {/**新しいパスワード入力フィールドを作成します */}
                <div>
                    <InputLabel htmlFor="password" value="新しいパスワード" />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                {/**パスワード確認入力フィールドを作成します */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="新しいパスワード（再入力）"
                    />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                {/**保存ボタンと成功メッセージを表示するフレックスコンテナを作成します */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>保存</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
