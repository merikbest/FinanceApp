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

startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    //Check number
    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function () { //Method in object
        //Create cycle whe 2 times asked user
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", '');
            let b = prompt("Во сколько обойдется?", '');

            //Check if insert data is a string type, not null, not empty,
            if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
                console.log('done');
                appData.expenses[a] = b;
            } else {
                console.log ("bad result");
                i--;
            }
        }
    },
    detectDayBudget: function () {
        //.toFixed - Number of digits after the decimal point
        appData.moneyPerDay = (appData.budget / 30).toFixed(2);
        alert("Бюджет на 1 день составляет: " + appData.moneyPerDay);
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log("Средний уровень достатка");
        } else if (appData.moneyPerDay > 2000) {
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений?", '');
            let percent = +prompt("Под какой процент?", '');

            appData.monthIncome = save / 100 / 12 * percent;
            alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
        }
    },
    chooseOptExpenses: function () {
        for (let i = 1; i <= 3; i++) {
            let questionOptExpenses = prompt("Статья необязательных расходов?", '');
            appData.optionalExpenses[i] = questionOptExpenses;
            console.log(appData.optionalExpenses);
        }
    },
    chooseIncome: function () {
        let items = prompt("Что пренесет дополнительный доход? (перечислите через запятую)", '');

        if (typeof (items) != "string" || typeof (items) == null || items == "") {
            console.log("Вы ввели некорректные данные или не ввели их вовсе");
        } else {
            appData.income = items.split(", ");
            appData.income.push(prompt("Может что-то еще?"));
            appData.income.sort();
        }

        appData.income.forEach(function (item, i) {
            console.log("Способы доп. заработка: " + (i + 1) + " - " + item);
        });
    }
};

for (let appDataKey in appData) {
    console.log("Наша программа включает в себя данные: " + appDataKey + appData[appDataKey]);
}