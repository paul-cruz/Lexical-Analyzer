import AnalizadorLexico from './AnalizadorLexico';
import { Tokens } from './Tokens';

export default class CalculatorEval {

    constructor(afd, exp) {
        this.exp = exp
        this.lexic = new AnalizadorLexico(this.exp, afd);
        this.result = 0.0;
    }

    initEval() {
        var token, v;
        if (this.E(v)) {
            token = this.lexic.yylex();
            if (token === 0) {
                this.result = v;
                return true;
            }
        }
        return false;
    }

    E(v) {
        if (this.T(v)) {
            if (this.Ep(v))
                return true;
        }
        return false;
    }

    Ep(v) {
        var token, v1;
        token = this.lexic.yylex();
        if (token === Tokens.MAS || token === Tokens.MENOS) {
            if (this.T(v1)) {
                v = v + (token === Tokens.MAS ? v1 : -v1);
                if (this.Ep(v))
                    return true;
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    T(v) {
        if (this.F(v)) {
            if (this.Tp(v))
                return true;
        }
        return false;
    }

    Tp(v) {
        var token, v1;
        token = this.lexic.yylex();
        if (token === Tokens.PROD || token === Tokens.DIV) {
            if (this.F(v1)) {
                v = v * (token === Tokens.PROD ? v1 : 1.0 / v1);
                if (this.Tp(v))
                    return true;
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    F(v) {
        var token;
        token = this.lexic.yylex();
        switch (token) {
            case Tokens.PAR_I:
                if (this.E(v)) {
                    token = this.lexic.yylex();
                    if (token === Tokens.PAR_D)
                        return true;
                }
                return false;

            case Tokens.NUM:
                v = parseFloat(this.lexic.Lexema);
                return true;

            default:
                break;
        }
        return false;
    }
}