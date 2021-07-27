# 教室借用系統
## Usage
1. edit your ENV configs in `/.env_example`, and rename it to `/.env`.
  ```.env
  // `/.env_example`
  PORT=<port>
  NODE_ENV=<development | production>
  MONGODB_URI=<your-mongodb-uri>
  SESSION_SECRET=<your-session-secret>
  ```
2. `$ npm ci` : install all locked dependencies to avoid version issues.
3. `$ npm run webpack` : bundle all `js`&`css`files target to browser via `Webpack`.
4. `$ npm build` : compile `ES6` to `ES5` target to server via `Babel`
5. `$ npm start` : start web server

## Technologies
- 前端
  - 語言：原生 HTML/CSS/JavaScript
  - 套件：Bootstrap
  - View模板語言：Handlebars
  - 打包工具：Webpack
- 後端
  - 語言：Node.js
  - 資料庫：MongoDB Atlas(host on cloud)
  - 網站架構：MVC
  - 權限驗證函式庫：Passport.js

## Features
1. 基於角色的權限管理系統 (功能：*登入、登出、註冊*。角色：*使用者、管理員*)
2. 查看所有通過審核的教室借用紀錄 (所有人、不須登入)
3. 審核系統 (管理員)
4. 新增/刪除教室 (管理員)
5. 新增/刪除教室時段 (管理員)
6. 使用者預約教室 (使用者)
7. 使用者查看審核狀況 (使用者)
8. 自動幫管理員審核已過期的教室預約 (系統自動處理)
9. 資料過濾器 (功能：資料欄位的值可以指定或留空)
