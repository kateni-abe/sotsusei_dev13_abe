// ファイル: resources/js/Pages/Dashboard.jsx

// AuthenticatedLayoutコンポーネントをインポート
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// Inertia.jsのHeadコンポーネントをインポート
import { Head } from "@inertiajs/react";
// qrcode.react モジュールをインポート
import QRCode from "qrcode.react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

//mui ボタンの設定
const BlackButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    borderRadius: 8,
    fontSize: 15,
    padding: "6px 30px",
    lineHeight: 1.5,
    backgroundColor: "black",
    fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
        backgroundColor: "#555555",
        boxShadow: "none",
    },
    "&:active": {
        boxShadow: "none",
        backgroundColor: "#333333",
        borderColor: "#005cbf",
    },
    "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
});

// Dashboardコンポーネントを定義。authオブジェクトとuserDetailsオブジェクトをプロップとして受け取りますよ。
export default function dashboard({ auth, userDetails = {} }) {
    // console.log(userDetails);

    const publicDetailsKeys = Object.keys(userDetails).filter(
        (key) => key.endsWith("_public") && userDetails[key]
    );

    const hasPublicDetails = publicDetailsKeys.length > 0;

    const userURL = `${window.location.origin}/user/${auth.user.unique_token}`;

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        alert("マイカードリンクがクリップボードにコピーされました!");
    };

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
            <Head title="マイカード" />

            {/* 主要コンテンツエリア */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* ユーザーがログインしていることを通知するメッセージ */}
                        <div className="p-6 text-gray-900">
                            <h2>{auth.user.name}</h2>{" "}
                            {/* ユーザーの氏名を表示 */}
                            {hasPublicDetails ? (
                                <>
                                    {userDetails.icon_public === true && (
                                        <div>
                                            アイコン:{" "}
                                            <img
                                                src={userDetails.icon}
                                                alt="User Icon"
                                            />
                                        </div>
                                    )}
                                    {userDetails.birthdate_public == true && (
                                        <div>
                                            生年月日: {userDetails.birthdate}
                                        </div>
                                    )}
                                    {userDetails.birthplace_public == true && (
                                        <div>
                                            出身地: {userDetails.birthplace}
                                        </div>
                                    )}
                                    {userDetails.company_public == true && (
                                        <div>会社名: {userDetails.company}</div>
                                    )}
                                    {userDetails.position_public == true && (
                                        <div>役職: {userDetails.position}</div>
                                    )}
                                    {userDetails.industry_public == true && (
                                        <div>業種: {userDetails.industry}</div>
                                    )}
                                    {userDetails.hobby_public == true && (
                                        <div>趣味: {userDetails.hobby}</div>
                                    )}
                                    {userDetails.strengths_public == true && (
                                        <div>
                                            得意なこと: {userDetails.strengths}
                                        </div>
                                    )}
                                    {userDetails.weaknesses_public == true && (
                                        <div>
                                            苦手なこと: {userDetails.weaknesses}
                                        </div>
                                    )}
                                    {userDetails.phone_number_public ==
                                        true && (
                                        <div>
                                            電話番号: {userDetails.phone_number}
                                        </div>
                                    )}
                                    {userDetails.facebook_account_public ==
                                        true && (
                                        <div>
                                            Facebook:{" "}
                                            {userDetails.facebook_account}
                                        </div>
                                    )}
                                    {userDetails.instagram_account_public ==
                                        true && (
                                        <div>
                                            Instagram:{" "}
                                            {userDetails.instagram_account}
                                        </div>
                                    )}
                                    {userDetails.x_account_public == true && (
                                        <div>
                                            Twitter: {userDetails.x_account}
                                        </div>
                                    )}
                                    {userDetails.line_id_public == true && (
                                        <div>
                                            LINE ID: {userDetails.line_id}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p>
                                    プロフィールを編集して、カードの表示内容を設定してください
                                </p>
                            )}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                {/* QRコードエリア */}
                                <div className="p-6 text-gray-900 flex flex-col items-center">
                                    <QRCode value={userURL} size={128} />
                                    {/* QRコードに含まれるリンク情報の表示エリア */}
                                    <div className="mt-4 text-center">
                                        <BlackButton
                                            variant="contained"
                                            onClick={() =>
                                                copyToClipboard(userURL)
                                            }
                                        >
                                            マイカードリンクをコピー
                                        </BlackButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
