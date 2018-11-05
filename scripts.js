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
    formula.forEach((formulaObj, index) => {
        if (formulaObj === '%') {
            formula[index] = '*.01';
        }
    });
    
    result = eval(formula.join('').replace(/\)\(/g, ')*(').replace(/(?<=\d)\(/g, '*('));
}

function updateDisplays() {
    displayB.innerHTML = (displayA.innerHTML + '=');
    resultFixed = +(result.toFixed(3))
    displayA.innerHTML = resultFixed;
}

function isOperator(recent) {
    if (recent == '+') return true;
    if (recent == '-') return true;
    if (recent == '*') return true;
    if (recent == '/') return true;
}

buttons.forEach(button => button.addEventListener('click', function(e) {
    const tId = e.target.id;
    const tClass = e.target.className;
    const recent = formula.slice(-1)[0];

    switch(tClass) {
        case 'num':
            if (tId == '0' && formula == false) {
                return;
            } else if (recent == ')' || recent == '%') {
                formula.push('*');
                formula.push(tId);
            } else if (tId !== '0' && formula == false) {
                formula.pop();
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
                formula.push(tId);
            }
            break;
        case 'per':
            if (recent == '%') {
                return;
            } else if (recent == '(') {
                return;
            } else if (isOperator(recent)) {
                formula.pop();
                formula.push(tId);
            } else if (recent == '.' | formula == false) {
                formula.pop();
                formula.push(tId);
            } else {
                formula.push(tId);
            }
            break;
        case 'op':
            if (isOperator(recent)) {
                formula.pop();
                formula.push(tId);
            } else if (recent == '(') {
                return;
            } else {
                formula.push(tId)
            }
            break;
        case 'par':
            switch(tId) {
                case '(':
                    formula.push(tId);
                    break;
                case ')':
                    let countLPar = 0;
                    let countRPar = 0;
                    for (i = (formula.length - 1); i >= 0; i--) {
                        if (formula[i] == '(') {
                            countLPar ++;
                        } else if (formula[i] == ')') {
                            countRPar ++;
                        }
                    }
                    if (countLPar - countRPar >= 1) {
                        if (recent == '(') {
                            break;
                        } else if (isOperator(recent)) {
                            break;
                        } else {
                        formula.push(tId);
                        break;
                        }
                    }
                    break;
            }
            break;
        case 'clear':
            if (formula == false) {
                return;
            } else {
                formula.pop();
            }
    }
    updateDisplayA();
}));

document.querySelector('.eq').addEventListener('click', function() {
    operate(formula);
    updateDisplays();
    formula = [resultFixed];
});