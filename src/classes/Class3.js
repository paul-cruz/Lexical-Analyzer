import SimbolosEspeciales from './SimbolosEspeciales';
import AFD from './Class4';

/*class Stack {
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
}*/



var AnalizadorLexico = {
    AnalizLexic: function (sigma, AutAFD) {
        
        this.CadenaSigma = sigma ? sigma : "";
        this.PasoPorEdoAcept = false;
        this.IniLexema = (sigma && AutAFD) ? 0: -1;
        this.FinLexema = -1;
        this.CaracterActual = (sigma && AutAFD) ? 0: -1;
        this.token = -1;
        /*this.Pila = new Stack();
        this.Pila.clear();*/
        this.AutomataFD = AutFD ? AutFD : null;
        this.EstadoActual = 0;
        this.CaracterAcepPrevio = -1;
        this.Lexemas = [];
        this.tokens = [];

        /*this.yylex = function () {
            this.Pila.push(this.CaracterActual);
            if (this.CaracterActual > this.CadenaSigma.length)
                return SimbolosEspeciales.FIN;
            this.IniLexema = this.CaracterActual;
            return 1;
        }*/

        this.yylex = function(){
            var lex = "";
            let lexTok = {};
            this.IniLexema = 0;
            while(this.CaracterActual<this.CadenaSigma.length){
                var indice = this.AutomataFD.TransicionesAFD[this.EstadoActual].indexOf(this.CadenaSigma.charAt(this.CaracterActual));
                if(indice != -1){
                    this.EstadoActual = indice;
                    var tokAFD = this.AutomataFD.TransicionesAFD[this.AutomataFD.cardAlfabeto][indice]
                    if(tokAFD != -1){
                        this.CaracterAcepPrevio = this.CaracterActual;
                        this.token = tokAFD;
                    }
                    this.CaracterActual++;
                }else{
                    if(this.PasoPorEdoAcept == false){
                        return -1;
                    }else{
                        this.FinLexema = this.CaracterAcepPrevio;
                        lex = this.CadenaSigma.substring(this.IniLexema,this.FinLexema);
                        lexTok[lex] = this.token;
                        this.EstadoActual = 0;
                        this.CaracterActual = ++this.CaracterAcepPrevio;
                        this.IniLexema = this.CaracterActual;
                    }
                }
            }
            lex = this.CadenaSigma.substring(this.IniLexema,this.CadenaSigma.length-1);
            lexTok[lex] = this.token;
            return 0;
        }
    }
    
}