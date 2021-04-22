import AnalizadorLexico from './AnalizadorLexico';
import SimbolosEspeciales from './SimbolosEspeciales';
import { Tokens } from './Tokens';

export default class CalculatorEval {

    constructor(afd, exp) {
        this.exp = exp;
        this.lexic = new AnalizadorLexico(this.exp, afd);
        this.result = 0.0;
        this.suffixExp = "";
    }

    initEval() {
        var token, v = [], suffix = [""];
        if (this.E(v, suffix)) {
            token = this.lexic.yylex();
            if (token === SimbolosEspeciales.FIN) {
                this.result = v[0];
                this.suffixExp = suffix[0];
                return true;
            }
        }
        return false;
    }

    E(v, suffix) {
        if (this.T(v, suffix)) {
            if (this.Ep(v, suffix))
                return true;
        }
        return false;
    }

    Ep(v, suffix) {
        var token, v1 = [], suffix2 = [""];
        token = this.lexic.yylex();
        if (token === Tokens.MAS || token === Tokens.MENOS) {
            if (this.T(v1, suffix2)) {
                v[0] = v[0] + (token === Tokens.MAS ? v1[0] : -v1[0]);
                suffix[0] += ` ${suffix2[0]} ${token === Tokens.MAS ? '+' : '-'}`;
                if (this.Ep(v, suffix))
                    return true;
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    T(v, suffix) {
        if (this.F(v, suffix)) {
            if (this.Tp(v, suffix))
                return true;
        }
        return false;
    }

    Tp(v, suffix) {
        var token, v1 = [], suffix2 = [""];
        token = this.lexic.yylex();
        if (token === Tokens.PROD || token === Tokens.DIV) {
            if (this.F(v1, suffix2)) {
                v[0] = v[0] * (token === Tokens.PROD ? v1[0] : 1.0 / v1[0]);
                suffix[0] += ` ${suffix2[0]} ${token === Tokens.PROD ? '*' : '/'}`;
                if (this.Tp(v, suffix))
                    return true;
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    F(v, suffix) {
        var token;
        token = this.lexic.yylex();
        switch (token) {
            case Tokens.PAR_I:
                if (this.E(v, suffix)) {
                    token = this.lexic.yylex();
                    if (token === Tokens.PAR_D)
                        return true;
                }
                return false;

            case Tokens.NUM:
                v[0] = parseFloat(this.lexic.Lexema);
                suffix[0] = this.lexic.Lexema;
                return true;

            default:
                break;
        }
        return false;
    }
}