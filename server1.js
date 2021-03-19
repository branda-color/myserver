//執行純指令
//console.log("hello,world!");

//導入http模塊
const http = require('http');
const hostname = '127.0.0.1';
const port = 6001;
//服務器創建req監聽請求res響應監聽
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    //把字串返回給前端
    res.end('Hello word\n');
});

server.listen(port, hostname, () => {
    console.log(`伺服器在http://${hostname}:${port}`);
})

