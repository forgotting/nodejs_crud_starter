# Koa Starter

Koa 基本架構 GET POST PUT DELETE 


## 執行步驟

### 1. 安裝套件及執行程式

```
npm install

node index.js
```

### 2. 測試API

`GET koa2-starter/api`

會得到 `Hello :)`

`POST koa2-starter/api`、`PUT koa2-starter/api`

在body中 ， 利用JSON格式傳送

{ "name": "Alex","pwd":"123" }

會得到回傳JSON

{
    "name": "Alex",
    "pwd": "123"
}

`DELETE koa2-starter/api`

DELETE use /api/1

會得到回傳JSON

{"id":"1"}

### 4. 其他筆記

若將 koa2-starter 的資料夾名稱修改 ， 需到 `./router.js` 修改 `router.use('/新資料夾名稱', api.routes());`
