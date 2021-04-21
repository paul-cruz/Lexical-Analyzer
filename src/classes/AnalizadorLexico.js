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

class AnalizadorLexico {
    constructor(sigma, AutAFD){
        this.CadenaSigma = sigma ? sigma : "";
        this.PasoPorEdoAcept = false;
        this.IniLexema = (sigma && AutAFD) ? 0: -1;
        this.FinLexema = -1;
        this.InCaracterActual = (sigma && AutAFD) ? 0: -1;
        this.token = -1;
        this.Pila = new Stack();
        //this.Pila.clear();
        this.AutomataFD = AutAFD ? AutAFD : null;
        this.EstadoActual = 0;
        this.EdoTransicion = 0;
        this.Lexema = "";   
    }

    yylex(){
        this.Pila.push(this.InCaracterActual);
        if(this.InCaracterActual>=this.CadenaSigma.length){
            this.Lexema = "";
            return SimbolosEspeciales.FIN;
        }
        this.IniLexema = this.InCaracterActual;
        this.EstadoActual = 0;
        this.PasoPorEdoAcept = false;
        this.FinLexema = -1;
        this.token = -1;
        var banderaBreak = false;
        while(this.InCaracterActual < this.CadenaSigma.length && banderaBreak===false) {
            this.CaracterActual = this.CadenaSigma.charAt(this.InCaracterActual);
            this.EdoTransicion = this.AutomataFD.TransicionesAFD[this.EstadoActual][this.CaracterActual];
            if(typeof this.EdoTransicion !== "undefined"){
                var tokAFD = this.AutomataFD.TransicionesAFD[this.EdoTransicion]["Token"];
                if(tokAFD !== -1){
                    this.PasoPorEdoAcept = true;
                    this.token =tokAFD;
                    this.FinLexema = this.InCaracterActual;
                }
                this.InCaracterActual++;
                this.EstadoActual = this.EdoTransicion;
                continue;
                //return;
            }
            banderaBreak = true;
            //break
        }
        if(!this.PasoPorEdoAcept){
            console.log(this.CadenaSigma.charAt(this.InCaracterActual));
            this.InCaracterActual = this.IniLexema + 1;
            this.Lexema = this.CadenaSigma.substring(this.IniLexema,this.IniLexema+1);
            this.token = 2000;
            return parseInt(this.token);
        }
        this.Lexema = this.CadenaSigma.substring(this.IniLexema,this.FinLexema+1);
        this.InCaracterActual = this.FinLexema + 1;
        return parseInt(this.token);
    }

    undoToken(){
        if(this.Pila.items.length === 0){
            return false;
        }
        this.InCaracterActual = this.Pila.pop();
        return true;
    }


    

    /*getLexema(){
        var lex = this.CadenaSigma.substring(this.IniLexema,this.FinLexema);
        return lex;
    }*/

    analisisCadena(lex_tokens){
        var banderaBreak = false;
        var t = -1;
        var lex = "";
        while(!banderaBreak){
            t = this.yylex();
            if(t === SimbolosEspeciales.FIN){
                banderaBreak = true;
                continue;
            }
            lex = this.Lexema;
            lex_tokens[lex] = t;
            
        }
        return true;
    }
}

export default AnalizadorLexico;
