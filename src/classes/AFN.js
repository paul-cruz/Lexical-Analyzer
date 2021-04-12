import Estado from './Estado';
import Transicion from './Transicion';
import SimbolosEspeciales from './SimbolosEspeciales';
import AnalizadorLexico from './Class4';   //AFD

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

class ConjIj {
    constructor(cardAlf, conjIj, j) {
        this.j = j ? j : -1;
        if (conjIj) {
            this.ConjIj = conjIj;
        } else {
            this.ConjIj = new Set();
            this.ConjIj.clear();
        }
        this.TransicionesAFD = new Array(cardAlf + 1);
        for (var k = 0; k < cardAlf; k++) {
            this.TransicionesAFD[k] = -1;
        }
    }

}

function countIdAfn() {
    if (typeof countIdAfn.counter == "undefined") {
        countIdAfn.counter = 0;
    }
    return countIdAfn.counter++;
}

class AFN {
    //static countIdAfn = 0;
    static ConjDeAFNs = new Set();
    constructor() {
        this.IdAFN = countIdAfn();
        this.EdoIni = null;
        this.EdosAFN = new Set();
        this.Alfabeto = new Set();
        this.EdosAcept = new Set();
    }

    CrearAFNBasico(s) {
        var e1 = new Estado();
        var e2 = new Estado();
        var t = new Transicion(s, undefined, e2);
        e1.Trans.add(t);
        e2.EdoAcept = true;
        this.Alfabeto.add(s);
        this.EdoIni = e1;
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        this.EdosAcept.add(e2);

        return this;
    }

    CrearAFNBasicoParams(s1, s2) {
        var i;
        var e1 = new Estado();
        var e2 = new Estado();
        var t = new Transicion(s1, s2, e2);

        e1.Trans.add(t);
        e2.EdoAcept = true;
        for (i = s1.charCodeAt(0); i < s2.charCodeAt(0); i++) {
            this.Alfabeto.add(String.fromCharCode(i));
        }
        this.EdoIni = e1;
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        this.EdosAcept.add(e2);

        return this;
    }

    UnirAFN(f2) {
        var e1 = new Estado();
        var e2 = new Estado();
        var t1 = new Transicion(SimbolosEspeciales.EPSILON, undefined, this.EdoIni);
        var t2 = new Transicion(SimbolosEspeciales.EPSILON, undefined, f2.EdoIni);
        e1.Trans.add(t1);
        e1.Trans.add(t2);

        this.EdosAcept.forEach(edo => {
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, e2));
            edo.EdoAcept = false;
        });

        f2.EdosAcept.forEach(edo => {
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, e2));
            edo.EdoAcept = false;
        });

        this.EdosAcept.clear();
        f2.EdosAcept.clear();
        this.EdoIni = e1;
        e2.EdoAcept = true;
        this.EdosAcept.add(e2);
        this.EdosAFN = new Set([...this.EdosAFN, ...f2.EdosAFN]);
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        this.Alfabeto = new Set([...this.Alfabeto, ...f2.Alfabeto]);
        return this;
    }

    ConcAFN(f2) {
        f2.EdoIni.Trans.forEach(trans => {
            this.EdosAcept.forEach(edo => {
                edo.Trans.add(trans);
                edo.EdoAcept = false;
            });
        });
        f2.EdosAFN.delete(f2.EdoIni);
        this.EdosAcept = f2.EdosAcept;
        this.EdosAFN = new Set([...this.EdosAFN, ...f2.EdosAFN]);
        this.Alfabeto = new Set([...this.Alfabeto, ...f2.Alfabeto]);

        return this;
    }

    cerrPos() {
        var e_ini = new Estado();
        var e_fin = new Estado();
        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, this.EdoIni));
        this.EdosAcept.forEach(edo => {
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, e_fin));
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, this.EdoIni));
            edo.EdoAcept = false;
        });
        this.EdoIni = e_ini;
        e_fin.EdoAcept = true;
        this.EdosAcept.clear();
        this.EdosAcept.add(e_fin);
        this.EdosAFN.add(e_ini);
        this.EdosAFN.add(e_fin);
        return this;
    }

    cerrKleene() {
        var e_ini = new Estado();
        var e_fin = new Estado();
        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, this.EdoIni));
        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON,undefined,e_fin));
        this.EdosAcept.forEach(edo => {
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, e_fin));
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined,this.EdoIni));
            edo.EdoAcept = false;
        });
        this.EdoIni = e_ini;
        e_fin.EdoAcept = true;
        this.EdosAcept.clear();
        this.EdosAcept.add(e_fin);
        this.EdosAFN.add(e_ini);
        this.EdosAFN.add(e_fin);
        return this;
    }

    cerraduraEpsilon(e) {
        var R = new Set();
        var S = new Stack();
        var aux, Edo;
        R.clear();
        S.push(e);
        while (S.items.length !== 0) {
            aux = S.pop();
            R.add(aux);
            // eslint-disable-next-line
            aux.Trans.forEach((trans) => {
                Edo = trans.GetEdoTrans(SimbolosEspeciales.EPSILON);
                if (Edo != null) {
                    if (!R.has(Edo)) {
                        S.push(Edo);
                    }
                }
            });
        }
        return R;
    }

    opcional() {
        var e_ini = new Estado();
        var e_fin = new Estado();

        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, this.EdoIni));
        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, e_fin));

        this.EdosAcept.forEach(e => {
            e.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, e_fin));
            e.EdoAcept = false;
        });

        this.EdoIni = e_ini;
        e_fin.EdoAcept = true;
        this.EdosAcept.clear();
        this.EdosAcept.add(e_fin);
        this.EdosAFN.add(e_ini);
        this.EdosAFN.add(e_fin);

        return this;

    }

    Mover(Edo, Simb) {
        var C = new Set();
        var aux;

        C.clear();
        Edo.Trans.forEach(t => {
            aux = t.GetEdoTrans(Simb);
            if (aux != null) {
                C.add(aux);
            }
        });

        return C;
    }

    MoverMas(Edos, Simb) {
        var C = new Set();
        var aux;
        C.clear();
        Edos.forEach(Edo => {
            Edo.Trans(t => {
                aux = t.GetEdoTrans(Simb);
                if (aux != null) {
                    C.add(aux);
                }
            });
        });

        return C;
    }

    Ir_A(Edos, Simb) {
        var C = new Set();
        C.clear();
        C = this.cerraduraEpsilon(this.MoverMas(Edos, Simb));
        return C;
    }

    UnionEspecialAFNs(f, Token) {
        var e;
        if (!this.SeAgregoAFNUnionLexico) {
            this.EdosAFN.clear();
            this.Alfabeto.clear();
            e = new Estado();
            e.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, f.EdoIni));
            f.EdoIni = e;
            this.EdosAFN.add(e);
            this.SeAgregoAFNUnionLexico = true;
        } else
            this.EdoIni.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, f.EdoIni));

        f.EdosAcept.forEach(EdoAcep => {
            EdoAcep.Token = Token;
        });

        this.EdosAcept = new Set([...this.EdosAcept, ...f.EdosAcept]);
        this.EdosAFN = new Set([...this.EdosAFN, ...f.EdosAFN]);
        this.Alfabeto = new Set([...this.Alfabeto, ...f.Alfabeto]);
    }

    IndiceCaracter(ArregloAlfabeto, c) {
        var i;
        for (i = 0; i < ArregloAlfabeto.size(); i++) {
            if (ArregloAlfabeto[i] === c) {
                return i;
            }
        }
        return -1;
    }

    ConvAFNaAFD() {
        var CardAlfabeto;
        var i, j;
        var ArrAlfabeto;
        var Ij, Ik;
        var existe;
        var ConjAux = new Set();
        var EdosAFD = new Set();
        var EdosSinAnalizar = new Queue();
        var banderaBreak = false;
        EdosAFD.clear();
        CardAlfabeto = this.Alfabeto.count();
        ArrAlfabeto = new Array(CardAlfabeto);
        i = 0;
        this.Alfabeto.forEach(c => {
            ArrAlfabeto[i++] = c;
        });

        Ik = new ConjIj(CardAlfabeto);
        j = 0
        Ij = new ConjIj(CardAlfabeto, this.cerraduraEpsilon(this.EdoIni), j);
        EdosAFD.add(Ij);
        EdosSinAnalizar.enqueue(Ij);
        j++;
        while (EdosSinAnalizar.count !== 0) {
            Ij = EdosSinAnalizar.dequeue();
            // eslint-disable-next-line
            ArrAlfabeto.forEach((c) => {
                Ik = new ConjIj(CardAlfabeto, this.Ir_A(Ij.ConjI, c));
                if (Ik.ConjI.count === 0) {
                    return;
                }
                existe = false;
                this.EdosAFN.forEach(I => {
                    if (I.ConjI.equals(Ik.ConjI)) {
                        if (banderaBreak !== true) {
                            existe = true;
                            Ik.TransicionesAFD[this.IndiceCaracter(ArrAlfabeto, c)] = I.j;
                            //break; ->cambiando este break con una bander para terminar
                            banderaBreak = true;
                        }
                    }
                });
                banderaBreak = false;
                if (!existe) {
                    Ik.j = j;
                    EdosAFD.add(Ik);
                    EdosSinAnalizar.enqueue(Ik);
                    j++;
                }
            });
        }


        EdosAFD.forEach(I => {
            ConjAux.clear();
            ConjAux = new Set([...ConjAux, ...I.ConjI]);
            ConjAux = new Set([...ConjAux].filter(i => I.ConjI.has(i)));
            if (ConjAux.size !== 0) {
                ConjAux.forEach(EdoAcept => {
                    if (banderaBreak !== true) {
                        I.TransicionesAFD[CardAlfabeto] = EdoAcept.Token;
                        //break; -> Cambiando este break
                        banderaBreak = true;
                    }
                });
                banderaBreak = false;
            } else {
                I.TransicionesAFD[CardAlfabeto] = -1;
            }
        });
        var AutFD = AnalizadorLexico.AFD; //AFD
        i = 0;
        ArrAlfabeto.forEach(c => {
            AutFD.ArrAlfabeto[i++] = c;
        });
        AutFD.TransicionesAFD = new Array(j).fill(0).map(() => new Array(CardAlfabeto).fill(0));
        EdosAFD.forEach(I => {
            for (var columna = 0; columna <= CardAlfabeto; columna++) {
                AutFD.TransicionesAFD[I.j][columna] = I.TransicionesAFD[columna];
            }
        });

        return AutFD;
    }
}

export default AFN;