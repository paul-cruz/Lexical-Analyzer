import AFN from './AFN';
import AnalizadorLexico from './AnalizadorLexico';
import SimbolosEspeciales from './SimbolosEspeciales';
import { Tokens } from './Tokens';

export default class Regex2DFA {

    constructor(exp) {
        this.exp = exp;
        //this.lexic = new AnalizadorLexico(this.exp, afn);
        this.result = null;
    }

    convert() {
        var token, afn = new AFN();
        if (this.E(afn)) {
            token = this.lexic.yylex();
            if (token === SimbolosEspeciales.FIN) {
                this.result = afn;
                return true;
            }
        }
        return false;
    }

    E(afn) {
        if (this.T(afn)) {
            if (this.Ep(afn))
                return true;
        }
        return false;
    }

    Ep(afn) {
        var token, afn2 = new AFN();
        token = this.lexic.yylex();
        if (token === Tokens.OR) {
            if (this.T(afn2)) {
                afn.UnirAFN(afn2);
                if (this.Ep(afn))
                    return true;
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    T(afn) {
        if (this.C(afn)) {
            if (this.Tp(afn))
                return true;
        }
        return false;
    }

    Tp(afn) {
        var token, afn2 = new AFN();
        token = this.lexic.yylex();
        if (token === Tokens.CAT) {
            if (this.C(afn2)) {
                afn.ConcAFN(afn2);
                if (this.Tp(afn));
                return true;
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    C(afn) {
        if (this.F(afn)) {
            if (this.Cp(afn))
                return true;
        }
        return false;
    }

    Cp(afn) {
        var token;
        token = this.lexic.yylex();
        switch (token) {
            case Tokens.POS:
                afn.cerrPos();
                break;

            case Tokens.KLEENE:
                afn.cerrKleene();
                break;

            case Tokens.ONCE_NONE:
                afn.opcional();
                break;

            default:
                this.lexic.undoToken();
                return true;
        }
        if (this.Cp(afn))
            return true;
    }

    F(afn) {
        var token;
        token = this.lexic.yylex();
        switch (token) {
            case Tokens.PAR_I:
                if (this.E(afn)) {
                    token = this.lexic.yylex();
                    if (token === Tokens.PAR_D)
                        return true;
                }
                return false;

            case Tokens.SYMBOL:
                var isRange = this.lexic.Lexema.includes('-') && this.lexic.Lexema.length > 1;
                if (isRange) {
                    var symbols = this.lexic.Lexema.split('-');
                    afn.CrearAFNBasicoParams(symbols[0], symbols[1]);
                } else {
                    afn.CrearAFNBasico(this.lexic.Lexema);
                }
                return true;

            default:
                break;
        }
        return false;
    }
}