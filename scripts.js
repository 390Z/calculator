const buttons = document.querySelectorAll('button');
const displayA = document.querySelector('.display-a')
const displayB = document.querySelector('.display-b')
let formula = [];
let result = '';
let resultFixed = '';

function updateDisplayA() {
    displayA.innerHTML = formula.join('').replace(/\*/g, '×').replace(/\//g, '÷');
}

function operate(formula) {
    result = eval(formula.join(''));
}

function updateDisplays() {
    let formulaFixed = formula.join('').replace(/\*/g, '×').replace(/\//g, '÷');
    displayB.innerHTML = (formulaFixed + '=');
    resultFixed = +(result.toFixed(7))
    displayA.innerHTML = resultFixed;
}

buttons.forEach(button => button.addEventListener('click', function(e) {
    const tId = e.target.id;
    const tClass = e.target.className;
    const recent = formula.slice(-1)[0];

    switch(tClass) {
        case 'num':
            if (recent == ')' || recent == '%') {
                formula.push('*');
                formula.push(tId);
            } else {
            formula.push(tId);
        }
            break;
        case 'dec':
            if (recent == '.') {
                return;
            } else if (recent == ')' || recent == '%') {
                formula.push('*');
                formula.push(tId);
            } else {
                formula.push(tId); //need logic to prevent multiple decimals in one number
            }
            break;
        case 'op':
            if (recent == '+' || recent == '-' || recent == '*' ||  recent == '/') {
                formula.pop();
                formula.push(tId);
            } else if (recent == '(') {
                return;
            } else {
                formula.push(tId)
            }
            break;
        case 'par': //logic incomplete
            switch(tId) {
                case '(':
                    if (recent == '(') {
                        return;
                    } else if (isNaN(recent) == false) {
                        formula.push('*');
                        formula.push(tId);
                    }
                    else {
                        formula.push(tId);
                    }
                    break;
                case ')':
                    for (i = (formula.length - 1); i >= 0; i--) {
                        if (formula[i] == ')') {
                            break;
                        } else if (formula[i] == '(') {
                            if (recent == '(') {
                                break;
                            } else if (recent == '+' || recent == '-' || recent == '*' || recent == '/') {
                                break;
                            } else {
                            formula.push(tId);
                            }
                        }
                    }
                    break;
            }
            break;
        case 'clear':
            formula.pop();
            break;
    }
    updateDisplayA();
}));

document.querySelector('.eq').addEventListener('click', function() {
    operate(formula);
    updateDisplays();
    formula = [resultFixed];
});