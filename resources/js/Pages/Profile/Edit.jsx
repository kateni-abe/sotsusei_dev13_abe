// 必要なコンポーネントとライブラリをインポートします
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import UpdateUserDetailsForm from "./Partials/UpdateUserDetailsForm";

// `Edit` コンポーネントをエクスポートします。このコンポーネントは、ユーザーのプロフィール情報を編集するためのUIを提供します。
export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        // 認証されたレイアウトコンポーネントを使用して、ヘッダーとしてプロフィールタイトルを表示します。
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" /> {/* ページタイトルを設定します */}
            {/* 主要コンテンツエリアを設定します */}
            <div className="py-12">
                {/* コンテナを中央に配置し、各セクションを垂直方向にスペースを空けて配置します */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* プロフィール情報更新フォームを包含するボックスを作成します */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* パスワード更新フォームを包含するボックスを作成します */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* パスワード更新フォームを包含するボックスを作成します */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateUserDetailsForm className="max-w-xl" />
                    </div>

                    {/* ユーザー削除フォームを包含するボックスを作成します */}
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
