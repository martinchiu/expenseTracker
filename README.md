# expenseTracker
一個使用 Node.js + Express 打造的記帳軟體，可以瀏覽總金額、依據不同類別進行篩選、查看每一筆紀錄的詳細資訊。

## 畫面呈現
### 首頁
![首頁](https://github.com/martinchiu/expenseTracker/blob/main/public/image/3.a3首頁.png)
### 登入頁
![登入頁](https://github.com/martinchiu/expenseTracker/blob/main/public/image/3.a3登入頁.png)
### 編輯頁
![編輯頁](https://github.com/martinchiu/expenseTracker/blob/main/public/image/3.a3編輯頁.png)
### 新增頁
![新增頁](https://github.com/martinchiu/expenseTracker/blob/main/public/image/3.a3新增頁.png)

## 功能
### 登入前
- 使用者可以用信箱註冊
- 使用者可以用臉書帳號登入
- 使用者可以用google帳號登入
### 登入後
- 使用者可以在首頁一次瀏覽所有自己建立的支出清單
- 使用者可以在首頁看到所有支出清單的總金額
- 使用者可以新增一筆支出
- 使用者可以編輯支出的屬性
- 使用者可以刪除任何一筆支出
- 使用者可以根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 使用說明
1. 請先確認有安裝 node.js 與 npm
2. 打開終端機 (Terminal)，並複製 (Clone) 此專案至本機電腦
```
git clone https://github.com/martinchiu/expenseTracker.git
```
3. 進入專案資料夾
```
cd expense-tracker
```
4. 安裝所需套件
```
npm install
```
5. 啟動MongoDB 伺服器及創建資料庫並命名「expense-tracker」
6. 產生一組種子資料給資料庫
```
npm run seed
```
6.1 種子資料：
{email: 111@example.com, password: 12345678} 
{email: 222@example.com, password: 12345678}

7. 快速啟動（如果要進入開發者模式，請輸入：npm run dev，請先確保有安裝nodemon)
```
npm run start
``` 
8. 在瀏覽器網址列輸入 `http://localhost:3000/` 瀏覽網站
9. 若欲暫停使用
```
ctrl + c ( mac : command + .)
```

## 開發工具
- Node.js 14.16.0
- Express 4.17.1
- Express-Handlebars 6.0.1
- Bootstrap 4.3.1
- Font-awesome 5.15.4
- mongoose 6.0.14
- bcryptjs: 2.4.3
- connect-flash: 0.1.1
- dotenv: 10.0.0
- passport: 0.5.2
- passport-facebook: 3.0.0
- passport-google-oauth20: 2.0.0
- passport-local: 1.0.0