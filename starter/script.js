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

////////////////////////////////////////////////////////////
// 147 Creating DOM Elements

// показывать движение // получаем данные с которыми должно работать
// параметр функции наз. движение
const displayMovements = function (movements) {
  // Свойство интерфейса Element innerHTML устанавливает или получает HTML или XML разметку дочерних элементов.
  // опорожнить весь контейнер и только потом добовляем новые элементы
  // Возвращает всё включая HTML, все тэги
  // containerMovements.innerHTML = ``; // устанавливаем его в пустую строку
  // функция получает один массив движения, затем работает с этими данными
  movements.forEach(function (mov, i) {
    // функция (mov, i) обратного вызова
    // Способ узнать дипозит или вывод средств при помощи троичного оператора
    const type = mov > 0 ? `deposit` : `withdrawal`;
    // создаю шаблонный литерал ``
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    // insertAdjacentHTML() разбирает указанный текст как HTML или XML и вставляет полученные узлы (nodes) в DOM дерево в указанную позицию. Данная функция не переписывает имеющиеся элементы, что предотвращает дополнительную сериализацию и поэтому работает быстрее, чем манипуляции с innerHTML.
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
    // создание html
  });
};

///////////////////////////////////////////////////////////////////////
// 153 The reduce Method  //

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

///////////////////////////////////////////////
//  155 The Magic of Chaining Methods // Магия методов объединения в цепочки

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`; // Метод Math.abs() возвращает абсолютное значение числа, убрал минус в начале числа

  //сумма начисленных процентов, за пополнение счета
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1; // процент выплачивают, при условии что сумма процентов больше 1 в любой валюте
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

/////////////////////////////////////////////////////////////////
// 151 Computing Usernames // Вычисление имен пользователей

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase() // steven thomas williams
      .split(` `) // (3) ['steven', 'thomas', 'williams']
      .map(name => name[0]) // ['s', 't', 'w']
      .join(``); // stw
  }); // здесь не нужен return, зпдача вызвать побочный эффект, мы не создаем новое значение для возврата
};
createUsernames(accounts);

const updateUi = function (acc) {
  // Отобразить движение
  displayMovements(acc.movements);
  // Отобразить баланс
  calcDisplayBalance(acc);
  // отобразить итоги
  calcDisplaySummary(acc);
};

////////////////////////////////////////////////////////////////////
// 158 Implementing Login

// Event handler // Обработчик событий
let currentAccount; // Переменная определена снаружи, потому что понадобится информация о тек. счете для других функц.

btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault(); // Прервет форму отправки

  // В массиве accounts находим параметр равное введеному значению
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // Проверка, пин currentAccount на соотвествие введенному пину из inputLoginUsername
  // ?. проверяет, существует ли currentAccount, далее pin будет прочитан, только если он существует
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Отобразить пользовательский интерфейс и приветсвие
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(` `)[0]
    }`;
    containerApp.style.opacity = 100;

    // Очистка поля ввода
    // Оператор присваивания, присвоит  ""(пустая строка) значение для строк, опер. работает справа налево
    inputLoginUsername.value = inputLoginPin.value = ``; // .value что бы брать только содержимое поля ввода
    inputLoginPin.blur(); // Поле теряет фокус, исчезает курсор

    // Обновление ПИ(UI(пользовательского интерфейса))
    updateUi(currentAccount);
  }
});

////////////////////////////////////////////////////////////////////
// 159 Implementing Transfers // Осуществление трансфертов

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  // Получаем число amount
  const amount = Number(inputTransferAmount.value);
  // Находим и проверяем полученные данные из inputTransferTo.value
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc); // получаем, введеное число и введённый массив
  inputTransferAmount.value = inputTransferTo.value = ``;

  if (
    amount > 0 && // Баланс больше 0
    receiverAcc && // проверка существования акаунта, он должен существовать
    currentAccount.balance >= amount && // Баланс больше или равен переводимой сумме
    receiverAcc?.username !== currentAccount.username // проверка сеществует ли акаунт и запрещает перевод себе
  ) {
    currentAccount.movements.push(-amount); // вычитаем из баланса акаунта сумму перевода
    receiverAcc.movements.push(amount); // Добовляем сумму перевода к балансу получателя
    // Обновление ПИ(UI(пользовательского интерфейса))
    updateUi(currentAccount);
  } else {
    console.log(`ERROR`);
  }
});

////////////////////////////////////////////////////////////////////
// 160 The findIndex Method

// Метод findIndex() возвращает индекс в массиве, если элемент удовлетворяет условию проверяющей функции. В противном случае возвращается -1.
btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Удаляем акаунт
    accounts.splice(index, 1);
    // Скрыть интерфейс
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ``; // Удаление символов ставится после условий, иначе условия могут не выполниться
});
