# WakaTimeのAPIを使ってみる

## 概要
このプロジェクトは、WakaTimeのAPIを使用して特定のProjectのcommits情報を取得するために作られました。

主な機能としては、WakaTimeのAPIにログインし、認証コードを取得、その認証コードを使用してaccess_tokenを取得、そしてそのaccess_tokenを使用して特定のプロジェクトのcommits情報を取得します。


## インストール手順

```bash
npm install
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
mv key.pem config
mv cert.pem config
touch .env
```

### SESSION_SECRETを作成

```bash
node
require('crypto').randomBytes(32).toString('hex')
```

`.env`ファイルに情報を記入

```
CLIENT_ID={{WakaTimeのApp ID}}
CLIENT_SECRET={{WakaTimeのApp Secret}}
REDIRECT_URI={{WakaTimeに登録したcAuthorized Redirect URIs}}
SESSION_SECRET={{cryptoで生成したランダムな文字列}}
REPO={{WakaTimeと連携しているProject}}
```

各項目の詳細は以下の通りです：

- CLIENT_IDとCLIENT_SECRET：これらはWakaTimeのAPIを使用するために必要な認証情報です。WakaTimeのダッシュボードから取得できます。
- REDIRECT_URI：これはWakaTimeに登録した認証後のリダイレクト先のURLです。WakaTimeのダッシュボードで設定したものと同じものを使用してください。
- SESSION_SECRET：これはセッション管理に使用する秘密鍵です。上記のコマンドを使用してランダムな文字列を生成できます。
- REPO：これはWakaTimeと連携しているプロジェクトの名前です。

## サーバー立ち上げ

```bash
node src/server.js
```

[https://localhost:3000](https://localhost:3000)にアクセス


## 各エンドポイントについて
`routes.js`ファイルに各種エンドポイントの処理を記入しています。

- `/csrf-token` (GET)
    - 用途：csrf-tokenの取得に使用
    - 必要なパラメータ：なし
    - レスポンス：csrf-token

- `/` (GET)
    - 用途：WakaTimeの認証コードを送信してaccess_tokenを取得する。access_tokenが妥当ならばcommitsが取得できるリンクを表示
    - 必要なパラメータ：
        - access_tokenがない場合
            - なし
        - access_tokenがある場合
            - `access_token`
    - レスポンス：HTMLページ

- `/code` (GET)
    - 用途：認証コードを取得するかどうかを確認するページ`/get-code`で送信する`state`を生成する
    - 必要なパラメータ：`CLIENT_ID`,`REDIRECT_URI`
    - レスポンス：HTMLページ

- `/get-code` (GET)
    - 用途：認証コードを取得するためのURLにリダイレクトする
    - 必要なパラメータ：`CLIENT_ID`, `SCOPE`, `response_type`,`state`,`REDIRECT_URI`
    - レスポンス：リダイレクト

- `/response-code` (GET)
    - 用途：WakaTimeに登録したREDIRECT_URI
    - 必要なパラメータ：なし
    - レスポンス：HTMLページ

- `/auth` (POST)
    - 用途：`/`から`access_token`を取得するためにpostする
    - 必要なパラメータ：認証コード,`REDIRECT_URI`,`CLIENT_ID`,`CLIENT_SECRET`
    - レスポンス：`access_token`,`refresh_token`

- `/commits` (GET)
    - 用途：`commits`をjson形式で取得する
    - 必要なパラメータ：`REPO`,`access_token`
    - レスポンス：commitsのjsonデータ

- `/logout` (GET)
    - 用途：`cookie`に保存している`access_token`を失効し、cookieから削除する
    - 必要なパラメータ：`access_token`,`CLIENT_ID`,`CLIENT_SECRET`
    - レスポンス：HTMLページ



## ライセンス
MIT


