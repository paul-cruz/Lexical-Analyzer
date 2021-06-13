import AnalizadorLexico from './AnalizadorLexico';
import SimbolosEspeciales from './SimbolosEspeciales';
import LinkedList from './LinkedList';
import { Tokens } from '../utils/GramarTokens';
import { GRAMARS } from '../utils/GRAMARS';

export default class Gramars {

    constructor(exp) {
        this.exp = exp;
        this.rulesArray = [];
        this.count = 0;
        this.terminals = new Set();
        this.noTerminals = new Set();
        this.lexic = new AnalizadorLexico(this.exp, GRAMARS);
    }

    getTerminals() {
        if (!this.rulesArray)
            return false;
        this.rulesArray.forEach(rule => {
            rule.setTerminals(this.noTerminals, this.terminals);
        });
    }

    initEval() {
        var token;
        if (this.G()) {
            token = this.lexic.yylex();
            if (token === Tokens.SPACES) token = this.lexic.yylex();
            if (token === SimbolosEspeciales.FIN) {
                return true;
            }
        }
        return false;
    }

    G() {
        return this.rulesList();
    }

    rulesList() {
        if (this.rules()) {
            var token = this.lexic.yylex();
            if (token === Tokens.SPACES) token = this.lexic.yylex();
            if (token === Tokens.SEMICOLON) {
                return this.rulesListP();
            }
            return false;
        }
        return false;
    }

    rulesListP() {
        if (this.rules()) {
            var token = this.lexic.yylex();
            if (token === Tokens.SPACES) token = this.lexic.yylex();
            if (token === Tokens.SEMICOLON) {
                return this.rulesListP();
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    rules() {
        if (this.leftSide()) {
            var leftLexeme = this.lexic.Lexema;
            var token = this.lexic.yylex();
            if (token === Tokens.ARROW) {
                return this.rightSides(leftLexeme);
            }
            return false;
        }
        return false;
    }

    leftSide() {
        var token = this.lexic.yylex();
        if (token === Tokens.SPACES) token = this.lexic.yylex();
        return token === Tokens.SYMBOL;
    }

    rightSides(lex) {
        var auxList = new LinkedList();
        if (this.rightSide(auxList)) {
            auxList.addHead({ symbol: lex, isTerminal: false });
            this.rulesArray[this.count++] = auxList;
            this.noTerminals.add(lex);
            if (this.rightSidesP(lex))
                return true
        }
        return false;
    }

    rightSidesP(lex) {
        var token = this.lexic.yylex();
        if (token === Tokens.SPACES) token = this.lexic.yylex();
        if (token === Tokens.OR) {
            var auxList = new LinkedList();
            if (this.rightSide(auxList)) {
                auxList.addHead({ symbol: lex, isTerminal: false });
                this.rulesArray[this.count++] = auxList;
                this.noTerminals.add(lex);
                if (this.rightSidesP(lex))
                    return true
            }
            return false;
        }
        this.lexic.undoToken();
        return true;
    }

    rightSide(list) {
        var token = this.lexic.yylex();
        if (token === Tokens.SPACES) token = this.lexic.yylex();
        if (token === Tokens.SYMBOL) {
            list.add({ symbol: this.lexic.Lexema, token });
            return this.rightSideP(list);
        }
        return false;
    }

    rightSideP(list) {
        var token = this.lexic.yylex();
        if (token === Tokens.SPACES) token = this.lexic.yylex();
        if (token === Tokens.SYMBOL) {
            list.add({ symbol: this.lexic.Lexema, token });
            return this.rightSideP(list);
        }
        this.lexic.undoToken();
        return true;
    }

}