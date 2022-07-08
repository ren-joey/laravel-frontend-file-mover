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
    /**
     * 框架 build 完成之後的 root 路徑
     * 通常預設為 ./build
     */
    build_root: 'build',

    /**
     * 框架 build 完成之後的 index 檔案名稱
     * 通常預設為 index.html
     */
    build_index_filename: 'index.html',

    /**
     * laravel server 相關路徑
     *
     * @param laravel_server_root
     *      表示整個 laravel server repository 的根路徑
     * @param laravel_server_resources 預設為 'resources'
     *      用來放置 index.blade.php 等靜態資源的資料夾位置
     * @param laravel_server_public 預設為 'public'
     *      用來放置可對外直接存取的靜態資源路徑
     */
    laravel_server_root: '../../',
    laravel_server_resources: 'resources/views',
    laravel_server_public: 'public',

    /**
     * @param index_file_dest 預設為 'views'
     *      前端應用 route 入口的 blade.php 檔放置路徑
     * @param index_filename 預設為 'index.blade.php'
     *      該設定取決於你的 laravel server route
     * @example
     *      [in] file-mover.config.js.js
     *          index_file_dest: 'app
     *          index_filename: 'entry.blade.php
     *
     *      [in] routes/web.php
     *          Route::view('/<name>', 'app/entry');
     */
    index_file_dest: publicPath,
    index_filename: 'index.blade.php',

    /**
     * 靜態檔案放置路徑
     * 該設定取決於前端應用的 homepage 設定位置
     */
    resources_dest: publicPath
};