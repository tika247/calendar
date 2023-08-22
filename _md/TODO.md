## NEXT

- changeHTMLSpecialChars()
- validation in PHP

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

## Consider

- ユーザー情報をconfigファイルからMySQLに移す
    - https://www.sejuku.net/blog/9021
- PHP_MySQL (data will be stored in MySQL)