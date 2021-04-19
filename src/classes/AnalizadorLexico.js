
function IndiceCaracter(ArregloAlfabeto, c) {
    var i;
    for (i = 0; i < ArregloAlfabeto.length; i++) {
        if (ArregloAlfabeto[i] === c) {
            return i;
        }
    }
    return -1;
}

class AnalizadorLexico {
    constructor(sigma, AutAFD){
        this.CadenaSigma = sigma ? sigma : "";
        this.PasoPorEdoAcept = false;
        this.IniLexema = (sigma && AutAFD) ? 0: -1;
        this.FinLexema = -1;
        this.CaracterActual = (sigma && AutAFD) ? 0: -1;
        this.token = -1;
        this.AutomataFD = AutAFD ? AutAFD : null;
        this.EstadoActual = 0;
        this.CaracterAcepPrevio = -1;
        this.Lexema = "";   
    }

    yylex(){
        while(this.CaracterActual<this.CadenaSigma.length){
            var indice = this.AutomataFD.TransicionesAFD[this.EstadoActual][IndiceCaracter(this.AutomataFD.ArrAlfabeto, this.CadenaSigma.charAt(this.CaracterActual))];
            if(typeof indice !== "undefined"){
                this.EstadoActual = indice;
                var tokAFD = this.AutomataFD.TransicionesAFD[this.EstadoActual]["Token"]
                if(tokAFD !== -1){
                    this.PasoPorEdoAcept = true;
                    this.CaracterAcepPrevio = this.CaracterActual;
                    this.token = tokAFD;
                }
                this.CaracterActual++;
            }else{
                if(this.PasoPorEdoAcept === false){
                    return -1;
                }else{
                    this.FinLexema = this.CaracterAcepPrevio;
                    this.Lexema = this.CadenaSigma.substring(this.IniLexema,this.FinLexema+1);
                    this.EstadoActual = 0;
                    this.CaracterActual = ++this.CaracterAcepPrevio;
                    this.IniLexema = this.CaracterActual;
                    return this.token;
                }
            }
        }
        this.FinLexema = this.CadenaSigma.length;
        this.Lexema = this.CadenaSigma.substring(this.IniLexema,this.FinLexema);
        return 0;
    }

    /*getLexema(){
        var lex = this.CadenaSigma.substring(this.IniLexema,this.FinLexema);
        return lex;
    }*/

    analisisCadena(lex_tokens){
        var estado = this.yylex();
            while(estado !== 0){
                if(estado === -1){
                    return false;
                }
                console.log("Lexema: ",this.Lexema);
                console.log("Token: ",this.token);
                lex_tokens[this.Lexema] = this.token;
                estado = this.yylex();
            }
            console.log("Lexema: ",this.Lexema);
            console.log("Token: ",this.token);
            lex_tokens[this.Lexema] = this.token;
            return true;
    }
}

export default AnalizadorLexico;
