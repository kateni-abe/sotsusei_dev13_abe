// AuthenticatedLayoutコンポーネントをインポート
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// Inertia.jsのHeadコンポーネントをインポート
import { Head } from "@inertiajs/react";

// Dashboardコンポーネントを定義。authオブジェクトをプロップとして受け取ります。
export default function mycard({ auth }) {
    return (
        // AuthenticatedLayoutコンポーネントを使用して、
        // auth.userオブジェクトとヘッダー要素を渡します。
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    マイカード
                </h2>
            }
        >
            {/* Headコンポーネントを使用してページタイトルを設定します。 */}
            <Head title="mycard" />

            {/* 主要コンテンツエリア */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* ユーザーがログインしていることを通知するメッセージ */}
                        <div className="p-6 text-gray-900">
                            this page is my card!!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
