//測試同步與非同步效果

function test2() {
    setTimeout(() => {
        console.log(1000);
    }, 1000)
}


async function test() {
    for (let i = 0; i < 5; i++) {
        try {
            await test2();//非同步函數
            break

        } catch (e) {
            console.log('a', e);
        }
    }
}

test();

//測試回乎函數執行序列
let a = 1;
setTimeout(() => {
    console.log(a);

}, 0)

a = 2;

setTimeout(() => {
    console.log(a);
}, 0)

a = 3;
