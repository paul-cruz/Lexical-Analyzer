//import SimbolosEspeciales from './SimbolosEspeciales';
//import AFD from './Class4';

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
        this.AutomataFD = AutAFD ? AutAFD : null;
        this.EstadoActual = 0;
        this.CaracterAcepPrevio = -1;


        this.yylex = function(){
            while(this.CaracterActual<this.CadenaSigma.length){
                var indice = this.AutomataFD.TransicionesAFD[this.EstadoActual][this.AutomataFD.ArrAlfabeto.indexOf(this.CadenaSigma.charAt(this.CaracterActual))];
                if(typeof indice !== "undefined"){
                    this.EstadoActual = indice;
                    var tokAFD = this.AutomataFD.TransicionesAFD[this.AutomataFD.cardAlfabeto][indice]
                    if(tokAFD !== -1){
                        this.CaracterAcepPrevio = this.CaracterActual;
                        this.token = tokAFD;
                    }
                    this.CaracterActual++;
                }else{
                    if(this.PasoPorEdoAcept === false){
                        return -1;
                    }else{
                        this.FinLexema = this.CaracterAcepPrevio;
                        this.EstadoActual = 0;
                        this.CaracterActual = ++this.CaracterAcepPrevio;
                        this.IniLexema = this.CaracterActual;
                        return this.token;
                    }
                }
            }
            this.FinLexema = this.CadenaSigma.length-1;
            return 0;
        }

        this.getCadena = function (){
            var lex = this.CadenaSigma.substring(this.IniLexema,this.FinLexema);
            return lex;
        }

        this.analisisCadena = function(){
            var estado;
            while((estado = this.yylex) !== 0){
                if(estado === -1){
                    return false;
                }
                console.log("Lexema: ",this.getCadena);
                console.log("Token: ",this.token);
            }
            return true;
        }
    }
    
}

export default AnalizadorLexico;