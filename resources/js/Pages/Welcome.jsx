// 必要なモジュールをインポートやっていた
import { Link, Head } from "@inertiajs/react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

// Welcomeコンポーネントを定義
export default function Welcome({ auth }) {
    return (
        <>
            {/* ヘッド要素の設定 */}
            <Head title="Welcome" />

            {/* メインコンテナ */}
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                {/* タイトルエリア */}
                <Typography
                    variant="h2"
                    gutterBottom
                    style={{
                        fontWeight: "bold",
                        fontFamily: "Noto Sans JP, sans-serif",
                        paddingBottom: 10,
                        fontSize: "28px",
                    }}
                    component="div"
                >
                    ヒトトナリ
                </Typography>

                {/* ボタンエリア */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                    <BlackButton variant="contained" href={route("login")}>
                        ログイン
                    </BlackButton>
                    <BlackButton variant="contained" href={route("register")}>
                        新規登録
                    </BlackButton>
                </Stack>
            </div>
        </>
    );
}
