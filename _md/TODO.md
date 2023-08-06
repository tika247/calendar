## NEXT

- 複数人同時接続を可能にする
    - `$_SESSION["token"]`と`$_SESSION["userID"]`を`$_SESSION["{任意文字列}"] = [$_SESSION["token"], $_SESSION["userID"]]`にする
- sessionStorageをsetcookieにする。tech_memoのsessionSecureを参照する
- validaton in LogIn.tsx
- Axiosに対してBearer認証とInterceptorsの導入を検討する
- learn usage of MySQL
- PHP_MySQL (data will be stored in MySQL)

## Authentication

- Authentication
    - session-cookies
        - [image](../_design/session-cookies.png)
    - JWT
        - https://chat.openai.com/c/5dec11b2-b355-4151-9d0c-ac1b1faf56ee

[F] ユーザーIDとパスワードをバックエンドに渡します。
[B] ログインができれば認証し、フロントエンドにトークンを返します（*2）
[F] トークンをLocal Storageなどに保存して、取得したトークンを認証サーバーに送信します
[B] 正しいトークンだったら、ユーザー情報を返します
[F] 以降トークンを使ってユーザー情報にアクセスできるようになります。

## TODO

- consider `slim` as a framework