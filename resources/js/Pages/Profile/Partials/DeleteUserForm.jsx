// 必要なライブラリとコンポーネントをインポートします
import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

// `DeleteUserForm` コンポーネントをエクスポートします。このコンポーネントはアカウントの削除フォームを提供します。
export default function DeleteUserForm({ className = "" }) {
    // 確認ダイアログの表示状態とパスワード入力フィールドの参照を管理します
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    // `useForm` フックを使ってフォームのデータとエラーを管理します
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    // ユーザー削除の確認ダイアログを表示する関数を定義します
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    // ユーザーを削除する関数を定義します
    const deleteUser = (e) => {
        e.preventDefault(); // フォームのデフォルトの送信動作をキャンセルします

        // アカウント削除リクエストを送信します
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(), // 成功した場合、モーダルを閉じます
            onError: () => passwordInput.current.focus(), // エラーが発生した場合、パスワード入力フィールドにフォーカスを移動します
            onFinish: () => reset(), // リクエストが完了したら、フォームをリセットします
        });
    };

    // モーダルを閉じる関数を定義します
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        // セクション要素を作成し、クラス名を適用します
        <section className={`space-y-6 ${className}`}>
            {/**ヘッダー要素を作成し、タイトルと説明テキストを表示します*/}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    アカウント削除
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    一度アカウントを削除すると、復元することはできません。
                    <br />
                    アカウントを削除する場合は、以下のボタンより手続きを進めてください。
                </p>
            </header>
            {/**アカウント削除ボタンを作成し、クリック時に確認ダイアログを表示するように設定します*/}
            <DangerButton onClick={confirmUserDeletion}>
                アカウントを完全に削除
            </DangerButton>
            {/**確認ダイアログを表示するモーダルを作成します*/}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                {/**フォーム要素を作成し、onSubmitイベントハンドラを設定します*/}
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your account?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>
                    {/**パスワード入力フィールドを作成します*/}
                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    {/** キャンセルと削除ボタンを作成し、フレックスコンテナ内に配置します*/}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton className="ml-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
