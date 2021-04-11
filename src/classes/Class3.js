import SimbolosEspeciales from './SimbolosEspeciales';

class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length === 0)
            return "Underflow";
        return this.items.pop();
    }
}

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }
}

var AnalizadorLexico = {
    AnalizLexic: function () {
        this.CadenaSigma = "";
        this.PasoPorEdoAcept = false;
        this.IniLexema = this.FinLexema = -1;
        this.CaracterActual = -1;
        this.token = -1;
        this.Pila.clear();
        this.AutomataFD = null;

        this.yylex = function () {
            this.Pila.push(this.CaracterActual);
            if (this.CaracterActual > this.CadenaSigma.length)
                return SimbolosEspeciales.FIN;
            this.IniLexema = this.CaracterActual;
            return 1;
        }
    },

    AnalizLexicPar: function (sigma, AutFD) {
        this.CadenaSigma = sigma;
        this.PasoPorEdoAcept = false;
        this.IniLexema = 0;
        this.FinLexema = -1;
        this.CaracterActual = 0;
        this.token = -1;
        this.Pila.clear();
        this.AutomataFD = AutFD;

        this.yylex = function () {
            this.Pila.push(this.CaracterActual);
            if (this.CaracterActual > this.CadenaSigma.length)
                return SimbolosEspeciales.FIN;
            this.IniLexema = this.CaracterActual;
            return 1;
        }
    }
    
}