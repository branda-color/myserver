//非阻塞測試
var fs = require("fs");

fs.readFile('input2.txt', function (err, data) {
    if (err) {
        return console.log(err);
    } else {
        console.log(data.toString());
    }
});

console.log("Done!")