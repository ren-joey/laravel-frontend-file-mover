## 🍕 適用情境
1. 您的服務後端使用 php laravel
1. 前端使用 Vue.js 或 React.js 任一框架
1. 您的前後端 git repo 完全分離，且時常需要個別部署

👨‍🚀 如果你符合以上三格情況，這個 file-mover 可以幫助你快速把 build 完的前端資源放置到 laravel server 中

## 🔰 前置作業
1. to GitHub Packages 的步驟即可）
1. 需要一個 laravel server
1. 需要一個基於 React.js 或 Vue.js 的前端應用
1. 請先依照[官方教學](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)完成 github registry 註冊 （只需要完成 Authenticating to GitHub Packages 即可）
1. 建議先複製你的 laravel server 進行測試，等妳瞭解它的運作模式後再放到正式環境

---

## 指定 npm registry
1. 確認您的 github registry 有安裝成功，執行下列指令你應該可以看到
    ```shell
    cat ~/.npmrc

    # //npm.pkg.github.com/:_authToken=TOKEN
    ```
    如果你無法看到 `npm.pkg.github.com` 資訊或檔案不存在，請先依照[官方教學](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)完成 github registry 註冊（只需要完成 Authenticating to GitHub Packages 即可）
2. 在你的前端應用新增 `.npmrc` 檔案，並新增下列內容
    ```
    registry=https://npm.pkg.github.com
    ```
    用以告訴 npm 你所要安裝的 package 來源包含 `npm.pkg.github.com`

## 🚀 安裝
1. 在你的前端應用終端機執行下列指令
    ```shell
    npm install -D @ren-joey/laravel-frontend-file-mover@latest
    ```

2. 於根目錄新增檔案 `file-mover.config.js`，並新增以下內容
    ```js
    module.exports = {
        build_root: 'build',
        build_index_filename: 'index.html',
        laravel_server_root: '../../',
        laravel_server_resources: 'resources/views',
        laravel_server_public: 'public',
        index_file_dest: 'frontend',
        index_filename: 'index.blade.php',
        resources_dest: 'frontend'
    };
    ```
    - `build_root`: 前端應用 build 好之後的放置位置，通常不需要修改
    - `build_index_filename`: 前端應用 build 好之後的入口檔案，通常不需要修改
    - `laravel_server_root`: 請確認有正確指向 laravel server root (注意不是 public)
        - 此設定預設是將前端應用 repo 放置於 laravel 目錄中的 <u>/frontend</u> 資料夾，laravel 預設沒有這個資料夾，需自行建立。
    - `laravel_server_resources`: 如果你有修改 laravel 中 <u>/resources/views</u> 路徑會需要調整
    - `laravel_server_public`: 如果你有修改 laravel 中 <u>/public</u> 路徑會需要調整
    - `index_file_dest`: 為 `index.blade.php` 檔案放置的位置
    - `index_filename`: 為 `build_index_filename` 放置到 laravel 中想要指定的 .blade.php 檔案名稱
    - `resources_dest`: 為前端應用 cs, js...等資源在 laravel 中想要放置的位置
        - **不建議** 設定為 `''` 或 `'/'`，會讓 <u>/public</u> 資料夾變得難以維護

3. 如果你想要 `index_file_dest` 及 `resources_dest` 自動參考前端的 publicPath(vue) 或 homepage(react)，可以改用下列的設定
    ```js
    const fs = require('fs');
    const path = require('path');

    let publicPath = '';
    const packageJson = require(path.join(process.cwd(), 'package.json'));
    if (!packageJson.homepage){
        const vueConfigPath = path.join(process.cwd(), 'vue.config.js');
        if (fs.existsSync(vueConfigPath)) {
            // Vue build path
            publicPath = vueConfigPath.publicPath || ''
        }
    } else {
        // React build path
        publicPath = packageJson.homepage;
    }

    module.exports = {
        build_root: 'build',
        build_index_filename: 'index.html',
        laravel_server_root: '../../',
        laravel_server_resources: 'resources/views',
        laravel_server_public: 'public',
        index_file_dest: publicPath,
        index_filename: 'index.blade.php',
        resources_dest: publicPath
    };
    ```

## 更新 Laravel Routes
1. 查看你的 laravel server 中的 routes 設定，通常放置於 <u>routes/web.php</u> 檔案中，預設內容為：
    ```php
    Route::get('/', function () {
        return view('welcome');
    });
    ```
2. 以第一個 config 預設值為例子，你會需要將原本的內容刪除並新增
    ```php
    Route::view('/any/route', '/frontend/index');
    ```
    - `'/any/route'` 為指定的 route 路徑，這邊可以依照業務需求調整
    - `/frontend/index` 代表當 `'/any/route'` 被請求時，會至 `'resources/views/frontend/index.blade.php'` 尋找 blade 檔，這個檔案在後面的步驟中會幫你建立起來

    以第二個 config 為例子，如果你的 publicPath 設定為 `'/promotion/event'`，你的 route 就需要調整為
    ```php
    Route::view('/any/route', '/promotion/event/index');
    ```
    - 代表一但 `http://localhost/any/route` 被請求時 laravel 就會嘗試取得 `'resources/views/promotion/event/index.blade.php'`
    - 更詳細的介紹可以參考[Laravel 官方文件](https://laravel.com/docs/9.x/routing#view-routes)來了解 route 跟 blade 之間的關係

## 🚩 執行
1. 執行指令
    ```shell
    npm run build
    npx move-frontend-app
    ```

2. 完成後會把檔案都放置到指定位置中，你可以查看 <u>/resources/views</u> 及 <u>/resources/public</u> 的內容。<br>
    以第一個 config 為例子，完成之後的資料夾結構會如下面所示：
    ```
    laravel
        └ resources
        |   └ views
        |       └ frontend
        |           └ index.blade.php
        └ public
            └ frontend
                └ css
                └ js
                └ favicon.ico
                └ ...
    ```

3. 新增下列 npm-script 到你的前端應用的 `package.json` 中
    ```json
    {
        "scripts": {
            "build:server": "npm run build && move-frontend-app"
        }
    }
    ```

4. 之後執行
    ```shell
    npm run build:server
    ```
    就可以自動 build 完之後將檔案搬移到 server 中

## 添加 .gitignore
為了避免每次前端 `build:server` 之後影響到後端 repo 的 git flow，可以將前端會使用到的路徑添加到 `.gitignore` 檔案中
```
/public/publicPath/*
/resources/publicPath/*
/frontend
```

## 注意
Laravel 會優先尋找 `/public` 資料夾中放置的靜態資源，如果不存在才會去比對 routes 的設定值，意思是說 `route/web.php` 中設定的監聽路徑 `'/frontend'` 跟 <u>public/frontend</u> 資料夾不能同時存在，要特別留意。<br>

舉例來說，當你的 route 設定如下
```php
Route::view('/frontend', '/promotion/event/index');
```
同時靜態資源的放置路徑如下
```
    laravel
        └ resources
        |   └ views
        |       └ promotion
        |           └ event
        |               └ index.blade.php
        └ public
            └ frontend
                └ css
                └ js
                └ favicon.ico
                └ ...
```
此時 `'/frontend'` 及 <u>/public/frontend</u> 就是衝突的，當 `'http://localhost/frontend'` 被請求時，會永遠被解析到 <u>/public/frontend</u> 導致畫面無法正常呈現
