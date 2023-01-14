'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// 142 Simple Array Methods // Простые методы массива

// let arr = [`a`, `b`, `c`, `d`, `e`];

// // SLICE
// // Метод slice() возвращает новый массив, содержащий копию части исходного массива.
// console.log(arr.slice(2)); // (3) ['c', 'd', 'e']
// console.log(arr.slice(2, 4)); // (2) ['c', 'd']
// console.log(arr.slice(-2)); // (2) ['d', 'e']
// console.log(arr.slice(-1)); //  ['e']
// console.log(arr.slice(1, -2)); // (2) ['b', 'c']
// console.log(arr.slice()); // (5) ['a', 'b', 'c', 'd', 'e']
// console.log([...arr]); // (5) ['a', 'b', 'c', 'd', 'e']

// // SPLICE
// // Метод splice() изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые.

// // console.log(arr.splice(2)); // (3) ['c', 'd', 'e']
// // console.log(arr); //  ['a', 'b'] // измененный массив

// // arr.splice(-1); // удалил `e`
// // console.log(arr); // (4) ['a', 'b', 'c', 'd']
// arr.splice(-1);
// console.log(arr); // ['a', 'b', 'c', 'd']
// arr.splice(1, 2);
// console.log(arr); // ['a', 'd']

// // REVERSE
// // Метод reverse() на месте обращает порядок следования элементов массива. Первый элемент массива становится последним, а последний — первым.

// arr = [`a`, `b`, `c`, `d`, `e`];
// const arr2 = [`j`, `i`, `h`, `g`, `j`];
// console.log(arr2.reverse()); // (5) ['j', 'g', 'h', 'i', 'j']
// console.log(arr2); // (5) ['j', 'g', 'h', 'i', 'j']  // мутирует исходный массив

// // CONCAT
// // Метод concat() возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.

// const letters = arr.concat(arr2);
// console.log(letters); // (10) ['a', 'b', 'c', 'd', 'e', 'j', 'g', 'h', 'i', 'j']
// console.log([...arr, ...arr2]); // не мутирует массивы, они остаются в первоночальной версии

// JOIN

// Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.
// Определяет строку, разделяющую элементы массива. В случае необходимости тип разделителя приводится к типу Строка. Если он не задан, элементы массива разделяются запятой ','. Если разделитель - пустая строка, элементы массива ничем не разделяются в возвращаемой строке

// console.log(letters.join(` - `)); // строка // a - b - c - d - e - j - g - h - i - j

////////////////////////////////////////////////////
// 143 The new at Method // Новый метод at

// Метод at() принимает значение в виде целого числа и возвращает элемент массива с данным индексом. В качестве аргумента метод принимает положительные и отрицательные числа. При отрицательном значении отсчёт происходит с конца массива.

// const arr = [23, 11, 64];
// console.log(arr[0]); // 23
// console.log(arr.at(0)); // 23 // точка массива в нулевой позиции

// // getting last array element // получение последнего элемента массива
// console.log(arr[arr.length - 1]); // 64
// console.log(arr.slice(-1)[0]); // 64 // что бы убрать скобки стаивтся [0] // получаем ценность массива
// console.log(arr.at(-1)); // 64

// console.log(`Sergey`.at(0)); // S
// console.log(`Sergey`.at(-1)); // y

////////////////////////////////////////////////////
// 144 Looping Arrays_ forEach.en_US // Циклические массивы_  forEach.en_US

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // Object.entries() метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value], в том же порядке, что и в цикле for...in

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You withdrew deposited ${movement}`);
//   } else {
//     // Метод Math.abs() возвращает абсолютное значение числа. то есть
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log(`--------------- FOREACH -----------------`);
// // не работают в FOREACH - CONTINUE, BREAK
// // Метод forEach() выполняет указанную функцию один раз для каждого элемента в массиве.
// // функция обратного вызова  // forEach евляется функцией высокого порядка
// // Имеет значене порядок аргументов, первый параметр - текущий элемент, второй - текущий индекс, третий весь массив
// // movement, index, array
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You withdrew deposited ${mov}`);
//   } else {
//     // Метод Math.abs() возвращает абсолютное значение числа. то есть
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

// 0: function(200)
// 1: function(450)
// 2: function(400)

////////////////////////////////////////////////////////////////
// 145 forEach With Maps and Sets.en_US

// Map
// Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
//   // USD: United States dollar
//   // EUR: Euro
//   // GBP: Pound sterling
// });

// // Set
// const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
// console.log(currenciesUnique); // Set(3) {'USD', 'GBP', 'EUR'}
// // value, key, map имеется ввиду value, value, map, но так писать нельзя
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
//   // USD: USD
//   // GBP: GBP
//   // EUR: EUR
// });

////////////////////////////////////////////////////
// 146 PROJECT_ _Bankist_ App

console.log(5 + 1 + 17 + 6 + 13 + 6 + 10); // 14.01.22
