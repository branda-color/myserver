//採取vm 來執行片段程式:1.部份程式片段抽離。2.不使用全域變數污染環境。
//SandBox 可能是一個開發程式時擬真的測試環境，也可能是一支程式用進行測試虛擬測試環境
const util = require('util');
const vm = require('vm');

//建立vm.Script，編譯要執行的程式
const script = new vm.Script('globalVar +=1;anotherGlobalVar = 1;');
//綁定到context物件
const sandbox = { globalVar: 1 };
//建立一個context，把sandbox物件綁訂到這個環境，作為全域物件
const contextifiedSandbox = vm.createContext(sandbox);
//執行上面編譯的程式
const result = script.runInContext(contextifiedSandbox);

console.log(`sendbox===contextifiedSandbox? ${sandbox === contextifiedSandbox}`);

console.log(`sandbox: ${util.inspect(sandbox)}`);

console.log(`result: ${util.inspect(result)}`);