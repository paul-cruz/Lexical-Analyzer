import Estado from './Estado';
import Transicion from './Transicion';
import SimbolosEspeciales from './SimbolosEspeciales';
import AFD from './AFD';
//import AnalizadorLexico from './Class4';   //AFD

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
        if (this.items.length < 1)
            return "Underflow";
        return this.items.shift();
    }
}

class ConjIj {
    j;
    ConjI;
    TransicionesAFD;
    constructor(CardAlf){
        this.j = -1;
        this.ConjI = new Set();
        this.TransicionesAFD = {}/*new Array(CardAlf+1);
        for(let k = 0 ; k <= CardAlf ; k++)
            this.TransicionesAFD[k] = -1;*/
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
        for (i = s1.charCodeAt(0); i < s2.charCodeAt(0) + 1; i++) {
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
        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, e_fin));
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

    cerraduraEpsilon(e) {   //Cerrradura que recibe un estado
            var R = new Set();
            var S = new Stack();
            var aux, Edo;

            S.push(e);

            while(S.items.length !== 0){
                aux = S.pop();
                R.add(aux);// eslint-disable-next-line
                aux.Trans.forEach(t => {
                    Edo = t.getEdoTrans(SimbolosEspeciales.EPSILON);
                    if(Edo !== null){    //no asignacion y comparacion
                        if(!R.has(Edo)){
                            S.push(Edo);
                        }
                    }
                });
            }
        return R;
    }

    cerraduraEpsilonEstados(edos) {
        
        var R = new Set();
        var S = new Stack();
        var aux, Edo;

        edos.forEach(e => {
            S.push(e);
        });

        while(S.items.length !== 0){
            aux = S.pop();
            R.add(aux);// eslint-disable-next-line
            aux.Trans.forEach(t => {
                Edo = t.getEdoTrans(SimbolosEspeciales.EPSILON);
                if(Edo !== null){
                    if(!R.has(Edo)){
                        S.push(Edo);
                    }
                }
            })
            
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
            if (aux !== null) {
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
            Edo.Trans.forEach(t => {
                aux = t.getEdoTrans(Simb);
                if(aux !== null){
                    C.add(aux);
                }
            });
        });
        return C;
    }

    Ir_A(Edos, Simb) {
        var C = new Set();
        C.clear();
        C = this.cerraduraEpsilonEstados(this.MoverMas(Edos, Simb));
        return C;
    }

    UnionEspecialAFNs(f, Token) {
        var e;
        if (!this.SeAgregoAFNUnionLexico) {
            this.EdosAFN.clear();
            this.Alfabeto.clear();
            e = new Estado();
            this.EdoIni = e;
            e.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, undefined, f.EdoIni));
            //f.EdoIni = e;
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
        for (i = 0; i < ArregloAlfabeto.length; i++) {
            if (ArregloAlfabeto[i] === c) {
                return i;
            }
        }
        return -1;
    }

    eqSet(as, bs) {     //funcion construida para suplit Equals de C# buscando igualdad de Sets
        if (as.size !== bs.size) return false;
        for (var a of as) if (!bs.has(a)) return false;
        return true;
    }

    ConvAFNaAFD() {
        var CardAlfabeto;
        var i, j;
        var ArrAlfabeto = [];
        var Ij, Ik;
        var existe;
        var AutFD; 

        var ConjAux = new Set();
        var EdosAFD = new Set();
        var EdosSinAnalizar =  new Queue();     //Cambiando fila de ConjIj por pila
        var NoAnalisis = new Set();
        EdosAFD.clear();
        NoAnalisis.clear();

        CardAlfabeto = this.Alfabeto.size;      //cambiando Alfabeto.count por size
        ArrAlfabeto = new Array(CardAlfabeto);
        i = 0;

        this.Alfabeto.forEach( c => ArrAlfabeto[i++] = c);      //Cambiando sintaxis del foreach

        //Ik = new ConjIj(CardAlfabeto);
        j = 0;
        Ij = new ConjIj(CardAlfabeto);
        Ij.ConjI = this.cerraduraEpsilon(this.EdoIni);       //Cambio de sintaxis para asignar variables de clase
        
        Ij.j = j;

        //EdosAFD.add(Ij);
        EdosSinAnalizar.enqueue(Ij);
        j++;
        while(EdosSinAnalizar.items.length !== 0){       //cambiando count por items.length
            Ij = EdosSinAnalizar.dequeue();// eslint-disable-next-line
            ArrAlfabeto.forEach( c => {         //Cambiando sintaxis de for each
                Ik = new ConjIj(CardAlfabeto);

                Ik.ConjI = this.Ir_A(Ij.ConjI, c);
                if(Ik.ConjI.size === 0){
                    //continue;
                    return;     //Cambiando por return por funcionamiento de foreach en Js
                }
                
                existe = false;
                var banderaBreak = false;
                EdosAFD.forEach( I => {     //cambiando sintaxis de foreach
                    if(banderaBreak){   //Bandera implementada para suplir break
                        return;
                    }
                    if(this.eqSet(I.ConjI, Ik.ConjI)){      //Implementando función propia supliendo equals set en C#
                        existe = true;
                        Ij.TransicionesAFD[this.IndiceCaracter(ArrAlfabeto, c)] = I.j;
                        //break;        //No se puede hacer break en for each, se implementa bandera para apartir de aqui saltar
                        banderaBreak = true;
                    }
                });
                NoAnalisis.forEach(I =>{
                    if(banderaBreak){
                        return;
                    }
                    if(this.eqSet(I.ConjI, Ik.ConjI)){      //Implementando función propia supliendo equals set en C#
                        existe = true;
                        Ij.TransicionesAFD[this.IndiceCaracter(ArrAlfabeto, c)] = I.j;
                        //break;        //No se puede hacer break en for each, se implementa bandera para apartir de aqui saltar
                        banderaBreak = true;
                    }
                });
                if(!existe){
                    Ik.j = j;
                    Ij.TransicionesAFD[this.IndiceCaracter(ArrAlfabeto, c)] = Ik.j;
                    EdosSinAnalizar.enqueue(Ik);
                    NoAnalisis.add(Ik);
                    j++;
                }
            });
            EdosAFD.add(Ij);
            NoAnalisis.delete(Ij);
        }

        EdosAFD.forEach(I => {      //cambiando sintaxis de for each
            ConjAux.clear();
            ConjAux = new Set([...ConjAux, ...I.ConjI]);        //cambiando sintaxis de unionwith
            ConjAux = new Set([...ConjAux].filter(element => I.ConjI.has(element)));     //Cambiando sintaxis de intersect
            let banderaBreak = false;
            if(ConjAux.size !== 0){      //Cambiando count por size
                ConjAux.forEach(EdoAcept => {       //Cambiando sintaxis de for each
                    if(banderaBreak){   //Supliendo break;
                        return;
                    }
                    I.TransicionesAFD["Token"] = EdoAcept.Token;
                    if(EdoAcept.Token !== -1)
                        banderaBreak = true;
                    //break;    Implementando bandera para suplir break
                    
                });
            } else {
                I.TransicionesAFD["Token"] = -1;
            }

            AutFD = AFD;
            AutFD.CardAlfabeto = CardAlfabeto;

            i = 0;
            ArrAlfabeto.forEach(c => {
                AutFD.ArrAlfabeto[i++] = c; 
            });

            AutFD.TransicionesAFD = {};   //Cambio por objeto de JS
            for(let m = 0 ; m < j ; m++){
                AutFD.TransicionesAFD[m] = {};
            }
            
            EdosAFD.forEach(I => {
                for(let columna = 0 ; columna < CardAlfabeto ; columna++){
                    if(typeof I.TransicionesAFD[columna] != "undefined")
                        AutFD.TransicionesAFD[I.j][columna] = I.TransicionesAFD[columna];   //cambiando forma de acceder a transiciones AFD[1,2] por [1][2]
                }
                AutFD.TransicionesAFD[I.j]["Token"] = I.TransicionesAFD["Token"];
            });
        });
        console.log(AutFD);
        return AutFD;
    }
}

export default AFN;