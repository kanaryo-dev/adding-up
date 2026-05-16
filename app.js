'use strict';
const fs = require('node:fs'); // 修正：node:fs に変更
const readline = require('node:readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs });
const prefectureDataMap = new Map(); 

rl.on('line', (lineString) => {
    const columns = lineString.split(',');
    const year = parseInt(columns[0]);
    const prefecture = columns[1];
    const popu = parseInt(columns[3]);
    
    if (year === 2016 || year === 2021) {
        let value = null;
        if (prefectureDataMap.has(prefecture)) {
            value = prefectureDataMap.get(prefecture);
        } else {
            value = {
                before: 0,
                after: 0,
                change: null
            };
        }
        
        // 年ごとにデータを仕分ける
        if (year === 2016) {
            value.before = popu;
        } else {
            value.after = popu; // 追記：2021年の人口を after に入れる
        }
        
        // 修正：新しく作った（または更新した）データをMapに保存する
        prefectureDataMap.set(prefecture, value); 
    }
}); // 修正：ここで rl.on('line') のカッコを正しく閉じる

rl.on('close', () => {
    console.log(prefectureDataMap);
});