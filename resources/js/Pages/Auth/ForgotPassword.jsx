import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import CancelButton from "@/Components/CancelButton";

export default function ForgotPassword({ status }) {
    // フォームデータを処理するための状態と関数を定義します
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    // フォーム送信を処理する関数を定義します
    const submit = (e) => {
        e.preventDefault();

        // 指定されたルートにフォームデータを送信します
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            {/* ユーザー向けの指示 */}
            <div className="mb-4 text-sm text-gray-600">
                パスワードリセット用のリンクをお送りいたします。
                <br />
                ご登録済みのメールアドレスを入力してください。
            </div>

            {/* 状態メッセージがある場合は表示します */}
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            {/* ユーザーがメールアドレスを送信するためのフォーム */}
            <form onSubmit={submit}>
                {/* ユーザーのメールアドレス用のテキスト入力 */}
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                {/* エラーがある場合はエラーメッセージを表示します */}
                <InputError message={errors.email} className="mt-2" />

                {/* フォームを送信するための送信ボタン */}
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        パスワードのリセットリンクを送る
                    </PrimaryButton>
                    <CancelButton className="ml-4" disabled={processing}>
                        <a href="/">キャンセル</a>
                    </CancelButton>
                </div>
            </form>
        </GuestLayout>
    );
}
