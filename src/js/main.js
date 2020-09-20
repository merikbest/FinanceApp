'use strict';

//Получить кнопку "Начать расчет" через id
let startBtn = document.getElementById("start");

//Получить все блоки в правой части программы через классы (которые имеют класс название-value, начиная с и заканчивая)
let budgetValue = document.getElementsByClassName('budget-value')[0];
let dayBudgetValue = document.getElementsByClassName('daybudget-value')[0];
let levelValue = document.getElementsByClassName('level-value')[0];
let expensesValue = document.getElementsByClassName('expenses-value')[0];
let optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0];
let yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

//Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)
let expensesItem = document.getElementsByClassName('expenses-item');

//Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной.
let expensesBtn = document.getElementsByTagName('button')[0];
let optionalExpensesBtn = document.getElementsByTagName('button')[1];
let countBtn = document.getElementsByTagName('button')[2];

//Получить поля для ввода необязательных расходов (optionalexpenses-item) при помощи querySelectorAll
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');

//Получить оставшиеся поля через querySelector (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)
let incomeItem = document.querySelector('.choose-income');
let checkSavings = document.querySelector('#savings');
let sumValue = document.querySelector('.choose-sum');
let percentValue = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

let money, time;

//Глобальный объект appData
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

//Если программа еще не запущена( не нажали кнопку "Начать расчет") - сделать кнопки неактивными.
if (appData.budget == null) {
    expensesBtn.disabled = true;
    expensesBtn.style.cursor = 'default';
    optionalExpensesBtn.disabled = true;
    optionalExpensesBtn.style.cursor = 'default';
    countBtn.disabled = true;
    countBtn.style.cursor = 'default';
    incomeItem.disabled = true;
    sumValue.disabled = true;
    percentValue.disabled = true;

    for (let i = 0; i < expensesItem.length; i++) {
        expensesItem[i].disabled = true;
    }

    for (let i = 0; i < optionalExpensesItem.length; i++) {
        optionalExpensesItem[i].disabled = true;
    }
}

//Функция получения бюджета пользователя и даты
//.addEventListener - обработчик событий (при нажатии на кнопку запускает функцию)
startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    //Проверить корректность введённого пользователем числа
    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }

    appData.budget = money;
    appData.timeData = time;

    //Запись результата в поле под названием "Доход" (index.html  class="budget-value")
    budgetValue.textContent = money.toFixed();
    //Методы для работы с датой. Если есть поля <input> лудше использовать метод .value
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    if (appData.budget != null) {
        expensesBtn.disabled = false;
        expensesBtn.style.cursor = 'pointer';
        optionalExpensesBtn.disabled = false;
        optionalExpensesBtn.style.cursor = 'pointer';
        countBtn.disabled = false;
        countBtn.style.cursor = 'pointer';
        incomeItem.disabled = false;
        sumValue.disabled = false;
        percentValue.disabled = false;

        for (let i = 0; i < expensesItem.length; i++) {
            expensesItem[i].disabled = false;
        }

        for (let i = 0; i < optionalExpensesItem.length; i++) {
            optionalExpensesItem[i].disabled = false;
        }
    }
});

//Функция подсчета расходов
expensesBtn.addEventListener('click', function () {
    let sum = 0;

    //expensesItem.length - количество полей <input> с класом "expenses-item" в index.html
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value;
        let b = expensesItem[++i].value;

        //Проверить введённые пользователям данные на соответствие условию
        if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
            console.log('done');
            appData.expenses[a] = b; //a - ключ, b - значение
            sum += +b; //+b - для того что бы передавалась число, так как в JS все передается в виде строки
        } else {
            console.log("bad result");
            i--;
        }

        expensesValue.textContent = sum;
    }
});

//Функция получения необязательных расходов
optionalExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let questionOptExpenses = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = questionOptExpenses;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ', ';
    }
});

//Функция подсчета дневного дохода и вывода уровня достатка
countBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(2);
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
        dayBudgetValue.textContent = "Произошла ошибка";
    }
});

//Функция динамического ввода в поле <input>
incomeItem.addEventListener('input', function () {
    let items = incomeItem.value;
    appData.income = items;
    incomeValue.textContent = appData.income;
});

//Функция для чекбокса
checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

//Функция расчета накопления за 1 месяц и за 1 год
sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});
