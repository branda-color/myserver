//阻塞程式測試
var fs = require("fs");
var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Done!");