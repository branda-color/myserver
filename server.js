const http = require("http");
const fs = require("fs");//導入fs模塊，可以用fs.readFile讀取html文件
const qs = require("querystring");//導入qs模塊可以拆解字串

const port = 3000;
const ip = "127.0.0.1";

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
    let url = request.url;


    if (method === "GET") {
        const requestUrl = new URL(url, `http://${ip}:${port}`);//當前訪問頁面，基本url
        console.log(requestUrl);
        console.log(requestUrl.searchParams.get("lang"));//獲取lang參數內值
        url = requestUrl.pathname;//獲取當前路徑但不包含請求參數

        const lang = requestUrl.searchParams.get("lang");//創建lang常量
        let selector;//保存語言字符串
        if (lang === null || lang === "en"
        ) {
            selector = "";
        } else if (lang === "zh") {
            selector = "-zh";
        } else {
            selector = ""
        }//如果沒有收到zh就默認英文版頁面


        if (url === "/") {
            sendResponse(`index${selector}.html`, 200, response);

        } else if (url === "/about.html") {
            sendResponse(`about${selector}.html`, 200, response);
        } else if (url === "/login.html") {
            sendResponse(`login${selector}.html`, 200, response);
        } else if (url === "/login-success.html") {
            sendResponse(`login-success${selector}.html`, 200, response);
        } else if (url === "/login-fail.html") {
            sendResponse(`login-fail${selector}.html`, 200, response);
        } else {
            sendResponse(`404${selector}.html`, 404, response)
        }

    } else {

        if (url === "/process-login") {
            let body = [];

            request.on("data", (chunk) => {
                body.push(chunk);
            });

            request.on("end", () => {
                body = Buffer.concat(body).toString();
                body = qs.parse(body);
                console.log(body);

                if (body.username === "john" && body.password === "john123") {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-success.html");
                } else {
                    response.statusCode = 301;
                    response.setHeader("Location", "/login-fail.html");
                }

                response.end();
            });
        }

    }


});


server.listen(port, ip, () => {
    console.log(`伺服器在http://${ip}:${port}`);
});