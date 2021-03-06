/**
 Calculator object using this context.
 */


var calculator = {
    read: function() {
        this.firstNumber = parseInt(prompt('Enter the first number: '));
        this.secondNumber = parseInt(prompt('Enter the second number: '));
    },
    sum: function() {
        return this.firstNumber + this.secondNumber;
    },
    mul: function() {
        return this.firstNumber * this.secondNumber;
    }
};

// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.mul());


/**
 Rewrite calculator using function-constructor.
 */


function Calculator() {
    this.read = function() {
        this.firstNumber = parseInt(prompt('Enter the first number: '));
        this.secondNumber = parseInt(prompt('Enter the second number: '));
    };
    this.sum = function() {
        return this.firstNumber + this.secondNumber;
    };
    this.mul = function() {
        return this.firstNumber * this.secondNumber;
    };
}

// var calculator = new Calculator();
// calculator.read();
// console.log('Sum: ' + calculator.sum());
// console.log('Mul: ' + calculator.mul());


/**
 Custom chaining with using this context.
 */


var ladder = {
    step: 0,

    up: function() {
        this.step++;
        return this;
    },
    down: function() {
        this.step--;
        return this;
    },
    showStep: function() {
        console.log(this.step);
        return this;
    }
};

// ladder.up().up().down().up().down().showStep();


/**
 Make possible the next syntax "sum(1)(2)(1)(3)(2)".
 */


function sum(argument) {
    var currentSum = argument;

    function add(number) {
        currentSum += number;
        return add;
    }

    add.toString = function() {
        return currentSum;
    };

    return add;
}

// console.log(sum(1)(2)(1)(5));
// console.log(sum(4)(2)(1)(5)(8));


/**
 The accumulator that saves all user entered values.
 */


function NumbersAccumulator(startValue) {
    this.value = startValue;

    this.read = function() {
        this.value += parseInt(prompt('Enter the number: ', 0));
    };

}

// var numbersAccumulator = new NumbersAccumulator(0);
// numbersAccumulator.read();
// numbersAccumulator.read();
// console.log(numbersAccumulator.value);


/**
 Create the calculator using function-constructor that accepts string 
 math expression.
 */


function Calculator() {

    this.operators = {
        '+': function(a, b) {
            return a + b;
        },
        '-': function(a, b) {
            return a - b;
        }
    };

    this.calculate = function(mathExp) {
        var expression = parseExpression(mathExp),
            currentOperator = expression[1],
            result = null;

        if (currentOperator in this.operators) {
            var firstNumber = +expression[0],
                secondNumber = +expression[2];

            result = this.operators[currentOperator](firstNumber, secondNumber);
        } else {
            console.log('You entered incorrect operator');
        }

        return result;
    };

    this.addMethod = function(name, func) {
        this.operators[name] = func;
    };

    function parseExpression(expression) {
        return expression.split(' ');
    }
}

// var calc = new Calculator();
// console.log(calc.calculate('3 + 7'));
// console.log(calc.calculate('5 + 3'));
// console.log(calc.calculate('2 - 2'));
// calc.addMethod('*', function(a, b) {
//     return a * b;
// });
// calc.addMethod('/', function(a, b) {
//     return a / b;
// });
// calc.addMethod('**', function(a, b) {
//     return Math.pow(a, b);
// });
// console.log(calc.calculate('2 * 2'));
// console.log(calc.calculate('6 / 2'));
// console.log(calc.calculate('3 ** 2'));
// console.log(calc.calculate('a ** 2'));


/**
 Create User constructor function with the get/set descriptors.
 */


function User(fullName) {
    this.fullName = fullName;

    Object.defineProperty(this, 'firstName', {
        get: function() {
            return this.fullName.split(' ')[0];
        },
        set: function(newFirstName) {
            this.fullName = newFirstName + ' ' + this.lastName;
        }
    });

    Object.defineProperty(this, 'lastName', {
        get: function() {
            return this.fullName.split(' ')[1];
        },
        set: function(newLastName) {
            this.fullName = this.firstName + ' ' + newLastName;
        }
    });
}

// var john = new User('John Doe');
// console.log(john.firstName);
// console.log(john.lastName);
// john.firstName = 'Mark';
// john.lastName = 'Moreno';
// console.log(john.fullName);


/**
 Create Article constructor with static properties and methods.
 */


function Article() {
    this.created = new Date();
    Article.articlesAmount++;
    Article.lastArticleDate = this.created;
}

Article.articlesAmount = 0;
Article.lastArticleDate = null;

Article.showStatus = function() {
    console.log(this.articlesAmount, this.lastArticleDate);
};

// new Article();
// new Article();
// Article.showStatus();
// new Article();
// Article.showStatus();


/**
 The function which returns the sum of arbitrary accepted arguments using 'call' method.
 */


function sumArgs() {
    return [].reduce.call(arguments, function(a, b) {
        return a + b;
    });
}

function mulArgs() {
    return [].reduce.call(arguments, function(a, b) {
        return a * b;
    });
}

// console.log(sumArgs(1, 2, 3));
// console.log(sumArgs(1, 2, 3, 2, 1));


/**
 The function implements the accepted function with an arbitrary amount of 
 arguments and returns the result of that function.
 */


function applyAll(func) {
    var arg = [].slice.call(arguments, 1);
    return func.apply(null, arg);
}

// console.log(applyAll(Math.max, 2, -2, 3));
// console.log(applyAll(Math.min, 2, -2, 3));
// console.log(applyAll(sumArgs, 1, 2, 3));
// console.log(applyAll(mulArgs, 2, 3, 4));


/**
 Practice with bind function.
 */


function ask(question, answer, ok, fail) {
    var result = prompt(question, '');
    if (result.toLowerCase() == answer.toLowerCase()) {
        ok();
    } else {
        fail();
    }
}

var user = {
    login: 'Jack',
    password: '12345',

    loginOk: function() {
        console.log(this.login + ' entered on the site');
    },

    loginFail: function() {
        console.log(this.login + ': access error');
    },

    checkPassword: function() {
        ask('Your password?', this.password, this.loginOk.bind(this), this.loginFail.bind(this));
    }
};

// var jack = user;
// user = null;
// jack.checkPassword();


/**
 Use decorator pattern with creating logging function.
 */

function addNumbers(a, b) {
    return a + b;
}

function makeLogging(f, log) {
    return function() {
        var arg = [].slice.apply(arguments);
        Array.prototype.push.apply(log, arg);
        return f.apply(this, arguments);
    };
}

// var log = [];
// add = makeLogging(addNumbers, log);

// add(1, 4);
// add(5, 9);

// for (var i = 0; i < log.length; i++) {
//     console.log('Log:' + log[i]);
// }


/**
 Practice with decorator pattern. Creating cache function that saves the decorated function
 results for certain arguments.
 */


function f(x) {
    return Math.random() * x;
}

function makeCaching(f) {
    var cache = {};

    return function(arg) {

        if (arg in cache) {
            return cache[arg];
        }

        cache[arg] = f.call(this, arg);
        return cache[arg];
    };
}

// var f = makeCaching(f);
// var a, b;
// a = f(1);
// b = f(1);
// console.log(a == b);
// b = f(2);
// console.log(a == b);
