let buttons = document.querySelectorAll('button');
let formula = [];
let result = '';
let display_A = document.querySelector('.display-a')
let display_B = document.querySelector('.display-b')

function updateDisplayA() {
    display_A.innerHTML = formula.join('');
}

function updateDisplayB() {
    display_B.innerHTML = result;
}

function operate(formula) {
    result = eval(formula.join(''));
}

function updateDisplays() {
    display_B.innerHTML = (formula.join('') + '=');
    display_A.innerHTML = result;

}

buttons.forEach(button => button.addEventListener('click', function(e) {
    let tId = e.target.id;
    let tClass = e.target.className;
    let recent = formula.slice(-1)[0];

    switch(tClass) {
        case 'num':
            formula.push(tId);
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
            if (recent == '+' ||
                recent == '-' ||
                recent == '*' ||
                recent == '/') {
                formula.pop();
                formula.push(tId);
            } else {
                formula.push(tId)
            }
            break;
        case 'par': //logic incomplete
            switch(tId) {
                case '(':
                    if (recent == '(') {
                        return;
                    } else {
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
                            } else if (recent == '+' ||
                                       recent == '-' ||
                                       recent == '*' ||
                                       recent == '/') {
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
    }
    updateDisplayA();
}));

document.querySelector('.eq').addEventListener('click', function() {
    operate(formula);
    updateDisplays();
    formula = [result];
});