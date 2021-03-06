## ð é©ç¨æå¢
1. æ¨çæåå¾ç«¯ä½¿ç¨ php laravel
1. åç«¯ä½¿ç¨ Vue.js æ React.js ä»»ä¸æ¡æ¶
1. æ¨çåå¾ç«¯ git repo å®å¨åé¢ï¼ä¸æå¸¸éè¦åå¥é¨ç½²

ð¨âð å¦æä½ ç¬¦åä»¥ä¸ä¸åææ³ï¼éå file-mover å¯ä»¥å¹«å©ä½ å¿«éæ build å®çåç«¯è³æºæ¾ç½®å° laravel server ä¸­

## ð° åç½®ä½æ¥­
1. éè¦ä¸å laravel server
1. éè¦ä¸ååºæ¼ React.js æ Vue.js çåç«¯æç¨
1. å»ºè­°åè¤è£½ä½ ç laravel server é²è¡æ¸¬è©¦ï¼ç­å¦³ç­è§£å®çéä½æ¨¡å¼å¾åæ¾å°æ­£å¼ç°å¢

---

## ð å®è£
1. å¨ä½ çåç«¯æç¨çµç«¯æ©å·è¡ä¸åæä»¤
    ```shell
    npm install -D laravel-frontend-file-mover
    ```

2. æ¼æ ¹ç®éæ°å¢æªæ¡ `file-mover.config.js`ï¼ä¸¦æ°å¢ä»¥ä¸å§å®¹
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
    - `build_root`: åç«¯æç¨ build å¥½ä¹å¾çæ¾ç½®ä½ç½®ï¼éå¸¸ä¸éè¦ä¿®æ¹
    - `build_index_filename`: åç«¯æç¨ build å¥½ä¹å¾çå¥å£æªæ¡ï¼éå¸¸ä¸éè¦ä¿®æ¹
    - `laravel_server_root`: è«ç¢ºèªææ­£ç¢ºæå laravel server root (æ³¨æä¸æ¯ public)
        - æ­¤è¨­å®é è¨­æ¯å°åç«¯æç¨ repo æ¾ç½®æ¼ laravel ç®éä¸­ç <u>/frontend</u> è³æå¤¾ï¼laravel é è¨­æ²æéåè³æå¤¾ï¼éèªè¡å»ºç«ã
    - `laravel_server_resources`: å¦æä½ æä¿®æ¹ laravel ä¸­ <u>/resources/views</u> è·¯å¾æéè¦èª¿æ´
    - `laravel_server_public`: å¦æä½ æä¿®æ¹ laravel ä¸­ <u>/public</u> è·¯å¾æéè¦èª¿æ´
    - `index_file_dest`: çº `index.blade.php` æªæ¡æ¾ç½®çä½ç½®
    - `index_filename`: çº `build_index_filename` æ¾ç½®å° laravel ä¸­æ³è¦æå®ç .blade.php æªæ¡åç¨±
    - `resources_dest`: çºåç«¯æç¨ cs, js...ç­è³æºå¨ laravel ä¸­æ³è¦æ¾ç½®çä½ç½®
        - **ä¸å»ºè­°** è¨­å®çº `''` æ `'/'`ï¼æè® <u>/public</u> è³æå¤¾è®å¾é£ä»¥ç¶­è­·

3. å¦æä½ æ³è¦ `index_file_dest` å `resources_dest` èªååèåç«¯ç publicPath(vue) æ homepage(react)ï¼å¯ä»¥æ¹ç¨ä¸åçè¨­å®
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

## æ´æ° Laravel Routes
1. æ¥çä½ ç laravel server ä¸­ç routes è¨­å®ï¼éå¸¸æ¾ç½®æ¼ <u>routes/web.php</u> æªæ¡ä¸­ï¼é è¨­å§å®¹çºï¼
    ```php
    Route::get('/', function () {
        return view('welcome');
    });
    ```
2. ä»¥ç¬¬ä¸å config é è¨­å¼çºä¾å­ï¼ä½ æéè¦å°åæ¬çå§å®¹åªé¤ä¸¦æ°å¢
    ```php
    Route::view('/any/route', '/frontend/index');
    ```
    - `'/any/route'` çºæå®ç route è·¯å¾ï¼ééå¯ä»¥ä¾ç§æ¥­åéæ±èª¿æ´
    - `/frontend/index` ä»£è¡¨ç¶ `'/any/route'` è¢«è«æ±æï¼æè³ `'resources/views/frontend/index.blade.php'` å°æ¾ blade æªï¼éåæªæ¡å¨å¾é¢çæ­¥é©ä¸­æå¹«ä½ å»ºç«èµ·ä¾

    ä»¥ç¬¬äºå config çºä¾å­ï¼å¦æä½ ç publicPath è¨­å®çº `'/promotion/event'`ï¼ä½ ç route å°±éè¦èª¿æ´çº
    ```php
    Route::view('/any/route', '/promotion/event/index');
    ```
    - ä»£è¡¨ä¸ä½ `http://localhost/any/route` è¢«è«æ±æ laravel å°±æåè©¦åå¾ `'resources/views/promotion/event/index.blade.php'`
    - æ´è©³ç´°çä»ç´¹å¯ä»¥åè[Laravel å®æ¹æä»¶](https://laravel.com/docs/9.x/routing#view-routes)ä¾äºè§£ route è· blade ä¹éçéä¿

## ð© å·è¡
1. å·è¡æä»¤
    ```shell
    npm run build
    npx move-frontend-app
    ```

2. å®æå¾æææªæ¡é½æ¾ç½®å°æå®ä½ç½®ä¸­ï¼ä½ å¯ä»¥æ¥ç <u>/resources/views</u> å <u>/resources/public</u> çå§å®¹ã<br>
    ä»¥ç¬¬ä¸å config çºä¾å­ï¼å®æä¹å¾çè³æå¤¾çµæ§æå¦ä¸é¢æç¤ºï¼
    ```
    laravel
        â resources
        |   â views
        |       â frontend
        |           â index.blade.php
        â public
            â frontend
                â css
                â js
                â favicon.ico
                â ...
    ```

3. æ°å¢ä¸å npm-script å°ä½ çåç«¯æç¨ç `package.json` ä¸­
    ```json
    {
        "scripts": {
            "build:server": "npm run build && move-frontend-app"
        }
    }
    ```

4. ä¹å¾å·è¡
    ```shell
    npm run build:server
    ```
    å°±å¯ä»¥èªå build å®ä¹å¾å°æªæ¡æ¬ç§»å° server ä¸­

## æ·»å  .gitignore
çºäºé¿åæ¯æ¬¡åç«¯ `build:server` ä¹å¾å½±é¿å°å¾ç«¯ repo ç git flowï¼å¯ä»¥å°åç«¯æä½¿ç¨å°çè·¯å¾æ·»å å° `.gitignore` æªæ¡ä¸­
```
/public/publicPath/*
/resources/publicPath/*
/frontend
```

## æ³¨æ
Laravel æåªåå°æ¾ `/public` è³æå¤¾ä¸­æ¾ç½®çéæè³æºï¼å¦æä¸å­å¨ææå»æ¯å° routes çè¨­å®å¼ï¼æææ¯èªª `route/web.php` ä¸­è¨­å®çç£è½è·¯å¾ `'/frontend'` è· <u>public/frontend</u> è³æå¤¾ä¸è½åæå­å¨ï¼è¦ç¹å¥çæã<br>

èä¾ä¾èªªï¼ç¶ä½ ç route è¨­å®å¦ä¸
```php
Route::view('/frontend', '/promotion/event/index');
```
åæéæè³æºçæ¾ç½®è·¯å¾å¦ä¸
```
    laravel
        â resources
        |   â views
        |       â promotion
        |           â event
        |               â index.blade.php
        â public
            â frontend
                â css
                â js
                â favicon.ico
                â ...
```
æ­¤æ `'/frontend'` å <u>/public/frontend</u> å°±æ¯è¡çªçï¼ç¶ `'http://localhost/frontend'` è¢«è«æ±æï¼ææ°¸é è¢«è§£æå° <u>/public/frontend</u> å°è´ç«é¢ç¡æ³æ­£å¸¸åç¾
