# 起動方法

```bash
npm install
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
mv key.pem config
mv cert.pem config
touch .env
```

## SESSION_SECRETを作成

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
