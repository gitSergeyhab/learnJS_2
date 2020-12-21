// filter

const names = ['ivan', 'ann', 'ksenia', 'voldemar'];

const shortNames = names.filter(name => name.length < 5);
console.log(shortNames);

// map

const xz = ['ivaN', 'Ann', 'ksENia', 'voldeMAR'];

const goodXz = xz.map(item => item.toUpperCase());
console.log(goodXz);

// every and some

console.log(goodXz.some(item => item.length == 4));
console.log(goodXz.every(item => item.length == 4));
console.log(goodXz.every(item => item.length > 2));

// reduce

const arr = [1,11,111,2,22,222];
const sumer = arr.reduce((sum, cur) => sum + cur);// 369
const sumer2 = arr.reduce((sum, cur) => sum + cur, 31);// 400
console.log(sumer2); 

const arr1 = ['1','11','111','2','22','222'];
const sumer1 = arr1.reduce((sum, cur) => sum + cur); //111111222222
const sumer3 = arr1.reduce((sum, cur) => `${sum}, ${cur}`); //1, 11, 111, 2, 22, 222
const sumer4 = arr1.join(); // 1,11,111,2,22,222
console.log(sumer4); 