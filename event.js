//利用EventEmitter綁定和監聽事件

//引用events模組
var event = require('events');
const eventEmitter = new event.EventEmitter();

//建立eventEmitter物件
var connectHandler = function connected() {
    console.log('連接成功');

    //觸發data_recived事件
    eventEmitter.emit('data_received');
}

//綁定connection事件處理常式
eventEmitter.on('connection', connectHandler);

//使用匿名函數綁定data_received事件
eventEmitter.on('data_received', function () {
    console.log('資料接收成功');
});

//觸發connection事件
eventEmitter.emit('connection');

console.log('程式執行完畢');

