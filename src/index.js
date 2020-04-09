function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let inputArray = expr.split('') // преобразуем строку в массив

    // Валидация скобок
    validationArray(inputArray);

    // Перебор массива - строки в числа + знаки
    let newArray = numberArray(inputArray);



    // Калькулятор со скобками
    // Добавляем скобки в начало и конец массива для отработки функции для всех примеров со скобками и без
    newArray.push(')');
    newArray.unshift('(');
    let arr = [];
    let x = 0;
    for (let i = 0; newArray.length > 1; i++) {
        if (newArray[i] === ')') {
            let j = i - 1;
            while (newArray[j] !== '(') {
                j--;
            }
            arr = newArray.splice(j + 1, i - j - 1);
            x = noBracketsCalculator(arr); // Калькулятор без скобок
            newArray.splice(j, 2, x);
            i = 1;
        }
    }



    // console.log(newArray);
    console.log(newArray[0]);
    return newArray[0];

}

module.exports = {
    expressionCalculator
}

// Валидация скобок
function validationArray(inputArray) {

    let x = 0;
    let y = 0;
    inputArray.forEach(element => {
        if (element == '(') {
            x++;
        } else if (element == ')') {
            y++;
        }
    });
    if (x != y) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
}

// Базовый калькулятор
function basicCalculator(x, y, operator) {
    // проверка деления на нуль
    if (operator == '/' && y == 0) {
        throw new Error("TypeError: Division by zero.");
    }
    // простые действия калькулятора
    switch (operator) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
    }
}

// Перебор массива - перевод из строк в числа
function numberArray(inputArray) {
    let accum = '';
    let numberArray = [];
    inputArray.forEach(element => {
        if (/[0-9]/.test(element)) {
            accum += element;
        } else if (/[\/\*\-\+()]/.test(element)) {
            if (accum != '') {
                numberArray.push(Number(accum));
                accum = '';
            }
            numberArray.push(element);
        }

    });
    if (accum != '') {
        numberArray.push(Number(accum));
    }
    return numberArray;
}

// Калькулятор без скобок
function noBracketsCalculator(newArray) {
    let x = 0;
    let y = 0;
    let operator = '';

    x = newArray[0];

    for (let i = 1; i < newArray.length; i++) {
        if (/[\-\+]/.test(newArray[i]) && newArray[i].length == 1) {
            if (operator == '') {
                operator = newArray[i];
                y = newArray[i + 1];
            } else {
                x = basicCalculator(x, y, operator);
                operator = newArray[i];
                y = newArray[i + 1];
            }
        }
        if (/[\*\/]/.test(newArray[i])) {
            if (operator == '') {
                x = basicCalculator(x, newArray[i + 1], newArray[i]);
            } else {
                y = basicCalculator(y, newArray[i + 1], newArray[i]);
            }
        }

    }

    if (operator != '') {
        x = basicCalculator(x, y, operator);
    }
    return x;

}