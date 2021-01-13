const http = require("http");
const fs = require("fs");//導入fs模塊，可以用fs.readFile讀取html文件

const sendResponse = (filename, statusCode, response) => {// 文件名/給用戶的狀態碼/response object
    fs.readFile(`./html/${filename}`, (error, data) => { //文件名和要調用的函數
        if (error) {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("抱歉，網路出了問題");
        } else {
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);

        }

    });

};

const server = http.createServer((request, response) => {

    console.log(request.url, request.method);
    // 把request.method和request.url賦予變量
    const method = request.method;
    const url = request.url;


    if (method === "GET") {
        if (url === "/") {
            sendResponse("index.html", 200, response);

        } else if (url === "/about.html") {
            sendResponse("about.html", 200, response);
        } else {
            sendResponse("404.html", 404, response)
        }

    } else {

    }


});

const port = 3000;
const ip = "127.0.0.1";
server.listen(port, ip, () => {
    console.log(`伺服器在http://${ip}:${port}`)
})