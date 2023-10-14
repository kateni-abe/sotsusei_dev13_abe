import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import CancelButton from "@/Components/CancelButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

// Loginコンポーネント定義
export default function Login({ status, canResetPassword }) {
    // useFormフックを使ってフォームデータとエラーを管理
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    // コンポーネントのアンマウント時にパスワードフィールドをリセット
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    // フォームの送信ハンドラ
    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        // ゲストレイアウトを使用
        <GuestLayout>
            <Head title="Log in" />

            {/* ステータスメッセージがある場合に表示 */}
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            {/* ログインフォーム */}
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Eメール" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            ログイン状態を保持
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            パスワードを忘れた
                        </Link>
                    )}

                    {/* プライマリボタンでログイン */}
                    <PrimaryButton className="ml-4" disabled={processing}>
                        ログイン
                    </PrimaryButton>
                    <CancelButton className="ml-4" disabled={processing}>
                        <a href="/">キャンセル</a>
                    </CancelButton>
                </div>
            </form>
        </GuestLayout>
    );
}
