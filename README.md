#### [English manual 🇺🇸](#en)

## 適用情境
1. 您的服務後端使用 php laravel
2. 前端使用 Vue.js 或 React.js 任一框架
3. 您的前後端 git repo 完全分離，且時常需要個別部署

👨‍🚀 這個 npm-script 可以幫助你快速把 build 完的前端資源放置到 laravel server 中

## 前置作業
1. 需要一個 laravel server
2. 需要一個基於 React.js 或 Vue.js 的前端應用
3. 建議先複製你的 laravel server 方便測試，等你了解此 npm-script 的運作模式後再放到正式環境。

---

# For React
## STEP 1
在你的前端應用中，於終端機執行下列指令
1. 將該 npm-script repo 以 **git submodule** 的形式放置在您的前端環境中
```shell
git submodule add git@github.com:bbinmkt-organization/npm-scripts-for-laravel-frontend.git node_tasks/npm-scripts-for-laravel-frontend
```
2. 安裝 npm-script 所需的必要 modules 在你的前端環境
```shell
npm i -D path chalk@4 fs-extra v8-compile-cache
```

## STEP 2
設定檔預設放置於：
```
node_tasks/npm_scripts_for_laravel_frontend/bin/file-mover.config.js.js
```

## STEP 3
請參考設定檔 `file-mover.config.js.js` 中的內容，確保相關設定符合您的環境設置

建議您將您的前端應用 repo 放置於 laravel 目錄中的 `frontend` 資料夾，laravel 預設
沒有這個資料夾，可以自行建立。

如果你照著以上方法設定，npm-script repo 的完整路徑看起來會類似下方：
```
/<laravel_server>/frontend/<frontend_application>/node_tasks/npm-scripts-for-laravel-frontend
```

如果你都按照上述指示安裝，能可能還會需要調整設定檔中的 `index_file_dest`、`resources_dest`，這些值會基於你在 laravel 服務中的 route 設定而有不同

```
/<laravel_server>/routes/web.php
```

## STEP 4
新增下列 npm-script 到你的前端應用的 `package.json` 中
```json
{
    "scripts": {
        "move-file-to-server": "node ./node_tasks/npm-scripts-for-laravel-frontend/bin/index.js",
        "build:server": "npm run build && npm run move-file-to-server"
    }
}
```
同時，你可能也會想調整 `package.json` 中的 `homepage` 來符合你在 `file-mover.config.js.js` 中的設定，你可以參考[React 官方文件](https://create-react-app.dev/docs/deployment/#building-for-relative-paths)來了解更多關於 `homepage` 設定的細節
```json
{
    "scripts": {},
    "homepage": "<build_path>"
}
```

## STEP 5
記得去更新你的 laravel server 中的 routes 設定，此設定檔通常放置於 `routes/web.php` 檔案中，該檔案的內容會類似：
```php
Route::view('/promotion', 'promotion/index');
```
`'promotion/index'` 表示，一但 `'/promotion'` 這個 url route 被觸發，會自動去下列路徑尋找 blade 資源 `'/resources/views/promotion/index.blade.php'`，而該資源的存在取決於你在 `file-mover.config.js.js` 中 `index_file_dest` 的設定值是否正確

你可以參考[Laravel 官方文件](https://laravel.com/docs/9.x/routing#view-routes)來了解 route 跟 blade 之間的關係

### 注意
Laravel 會優先尋找 `/public` 資料夾中放置的靜態資源，如果不存在才會去比對 routes 的設定值，意思是說 `route/web.php` 中設定的監聽路徑 `'/promotion'` 跟 `public/promotion` 資料夾不能同時存在，要特別留意。

## STEP 6
在你的前端應用中執行下列指令
```bash
npm run build:server
```

---
<span id="en"><span/>
## STEP 1
Run these commands in your terminal.

1. This command will help you to set the npm-script into your frontend app as a **git submodule**.
```shell
git submodule add git@github.com:bbinmkt-organization/npm-scripts-for-laravel-frontend.git node_tasks/npm-scripts-for-laravel-frontend
```
2. This command will install the essential modules which are required by the npm-script.
```shell
npm i -D path chalk@4 fs-extra v8-compile-cache
```

## STEP 2
Duplicate the `file-mover.config.js.sample.js` file which was placed in `node_tasks/npm_scripts_for_laravel_frontend/` by default. Afterwards, rename it as `file-mover.config.js.js`.

## STEP 3
Take a look at the `file-mover.config.js.js` file. Be sure this configuration is accurate to your service environment.

We assume (and recommend) that your frontend repository is placed in your laravel root's folder named `frontend`. If you do so, The path of this npm-script repository will looks like:
```
/laravel-server-root/frontend/frontend-app/node_tasks/npm-scripts-for-laravel-frontend
```
In this case, you don't have to edit the configuration. For others cases, you might need to revise `index_file_dest` and `resources_dest` key in the configuration.

## STEP 4
Add the following scripts in the package.json which belongs to your frontend application repository.
```json
{
    "scripts": {
        "move-file-to-server": "node ./node_tasks/npm-scripts-for-laravel-frontend/bin/index.js",
        "build:server": "npm run build && npm run move-file-to-server"
    }
}
```

## STEP 5
Remember to add `routes` in your laravel server router. It should be placed in `routes/web.php`.

`routes` would looks like:
```php
Route::view('/promotion', 'promotion/index');
```
`'promotion/index'` means once the `'/promotion'` url is requested, laravel service will locate to `'/resources/views/promotion/index.blade.php'` to get the content. Its existence depends on the key `index_file_dest` inside the `file-mover.config.js.js` configuration.

### NOTICE
Listening path `'/promotion'` in `route/web.php` and static resources path `resources_dest` in `file-mover.config.js.js` are mutually exclusive. Which means you are not able to set these two paths at the same time.

## STEP 6
Simply run it by the following command:
```bash
npm run build:server
```