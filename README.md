# 教室借用系統

# Demo

- [Demo](https://newone-classroom.herokuapp.com/)

## Technologies

- Frontend

  - Language : Vanilla HTML/CSS/JavaScript

  - Plugins：Bootstrap

  - compiler：Webpack, Babel

- Backend

  - Architecture：MVC

  - Language：Node.js

  - View Engine：Handlebars

  - Database：MongoDB Atlas(host on cloud)

  - Auth Library：Passport.js

## Features

1. 基於角色的權限管理系統 (功能：*登入、登出、註冊*。角色：*使用者、管理員*)

2. 查看所有通過審核的教室借用紀錄 (所有人、不須登入)

3. 審核系統 (管理員)

4. 新增/刪除教室 (管理員)

5. 開放/關閉教室可借用時段 (管理員)

6. 使用者預約教室 (使用者)

7. 使用者查看審核狀況 (使用者)

8. 自動幫管理員審核已過期的教室預約 (系統自動處理)

9. 資料過濾器 (功能：資料欄位的值可以指定或留空)

## Usage

1. setting your ENV configs in `.env_example`, and rename it to `.env`:

    ```.env
    PORT = <port>
    NODE_ENV = <development | production>
    MONGODB_URI = <your-mongodb-uri>
    SESSION_SECRET = <your-session-secret>
    ```

2. install all version-locked dependencies to avoid version issues:

    ```bash
    $ npm ci
    ```

3. bundle all js&css files target to browser via `webpack`:

    ```bash
    $ npm run webpack
    ```

4. compile `es6` to `es5` target to server via `babel`:

    ```bash
    $ npm run build
    ```

5. start web server:

    ```bash
    $ npm run start
    ```
