// ブートストラップファイルをインポートです
import "./bootstrap";
// アプリケーションのスタイルシートをインポート
import "../css/app.css";

// React DOMのcreateRoot関数をインポート（React 17の新しいConcurrentモードを有効にするため）
import { createRoot } from "react-dom/client";
// Inertia.jsのcreateInertiaApp関数をインポート（Inertiaアプリケーションを作成するため）
import { createInertiaApp } from "@inertiajs/react";
// resolvePageComponent関数をインポート（ページコンポーネントを解決するヘルパー関数）
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

// アプリケーション名を設定（環境変数から取得し、もし設定されていなければデフォルトの 'Laravel' を使用）
const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Inertiaアプリケーションを作成し設定
createInertiaApp({
    // ページタイトルのテンプレート関数を定義
    title: (title) => `ヒトトナリ`,
    // ページコンポーネントを解決するための関数を定義
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    // アプリケーションのセットアップを行う関数を定義
    setup({ el, App, props }) {
        // Reactのルートを作成
        const root = createRoot(el);
        // アプリケーションをレンダリング
        root.render(<App {...props} />);
    },
    // プログレスバーの色を設定
    progress: {
        color: "#4B5563",
    },
});
