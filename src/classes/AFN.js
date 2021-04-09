class Stack {
    constructor(){
        this.items = [];
    }

    push(element){
        this.items.push(element);
    }
    
    pop(){
        if (this.items.length == 0)
            return "Underflow"; 
        return this.items.pop();
    }
}

class AFN{
    static ContIdAFN = 0;
    constructor(){
        this.IdAFN = ContIdAFN++;
        this.EdoIni = null;
        this.EdosAFN = set();
        this.EdosAFN = clear();
        this.Alfabeto = set();
        this.Alfabeto = clear();
        this.EdosAcept = set();
        this.EdosAcept = clear();
    }

    CrearAFNBasico(s){
        var e1 = new Estado();
        var e2 = new Estado();
        var t = new Transicion(s, e2);
        e1.Trans.add(t);
        e2.EdoAcept = true;
        this.Alfabeto.add(s);
        this.EdoIni = e1;
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        this.EdosAcept.add(e2);

        return this;
    }

    CrearAFNBasico(s1, s2){
        var i;
        var t = new Transicion(s1, s2, e2);
        var e1 = new Estado();
        var e2 = new Estado();
        e1.Trans.add(t);
        e2.EdoAcept = true;
        for(var i = 0 ; i <= s2 ; i++){
           this.Alfabeto.add(i); 
        }
        this.EdoIni = e1;
        this.EdosAFN.add(e1);
        this.EdosAFN.add(e2);
        this.EdosAcept.add(e2);

        return this;
    }

    UnirAFN(f2){
        var e1 = new Estado();
        var e2 = new Estado();
        var t1 = new Transicion(SimbolosEspeciales.EPSILON, e2);
        var t2 = new Transicion(SimbolosEspeciales.EPSILON, f2.EdoIni);
        e1.Trans.add(t1);
        e1.Trans.add(t2);
        
        this.EdosAcept.forEach(edo => {
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, e2));
            edo.EdoAcept = false;
        });

        f2.EdosAcept.forEach(edo=>{
            edo.Trans.add(new Trancision(SimbolosEspeciales.EPSILON, e2));
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

    ConcAFN(f2){
        f2.EdoIni.Trans.forEach(trans=>{
            this.EdosAcept.forEach(edo=>{
                edo.Trans.add(trans);
                edo.EdoAcept = false;
            });
        });
        f2.EdosAFN.remove(f2.EdoIni);
        this.EdosAcept = f2.EdosAcept;
        this.EdosAFN = new Set([...this.EdosAFN, ...f2.EdosAFN]);
        this.Alfabeto = new Set([...this.Alfabeto, ...f2.Alfabeto]);

        return this;
    }

    cerrPos(){
        var e_ini = new Estado();
        var e_fin = new Estado();
        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON,this.EdoIni));
        this.EdosAcept.forEach(edo=>{
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, e_fin));
            edo.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, this.EdoIni));
            edo.EdoAcept = false;
        });  
        this.EdoIni = e_ini;
        e_fin.EdoAcept = true;
        this.EdosAcept.clear();
        this.EdosAcept.add(e_ini);
        this.EdosAFN.add(e_fin);
        return this;
    }

    cerraduraEpsilon(e){
        var R = new Set();
        var S = new Stack();
        var aux, Edo;
        R.clear();
        S.push(e);
        while(S.items.length != 0){
            aux = S.pop();
            R.add(aux);
            aux.Trans.forEach(trans=>{
                if((Edo = trans.GetEdoTrans(SimbolosEspeciales.EPSILON)) != null){
                    if(!R.has(Edo)){
                        S.push(Edo);
                    }
                }
            });
        }
        return R;
    }

    opcional(){
        e_ini = new Estado();
        e_fin = new Estado();

        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, this.EdoIni));
        e_ini.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, e_fin));

        this.EdosAcept.forEach(e=>{
            e.Trans.add(new Transicion(SimbolosEspeciales.EPSILON, e_fin));
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

    Mover(Edo, Simb){
        C = new Set();
        aux;

        C.clear();
        Edo.Trans.forEach(t => {
            aux = t.GetEdoTrans(Simb);
            if(Aux != null){
                C.add(aux);
            }
        });

        return C;
    }

    MoverMas(Edos, Simb){
        C = new Set();
        aux;
        C.clear();
        Edos.forEach(Edo => {
            Edo.Trans(t => {
                aux = t.GetEdoTrans(Simb);
                if(aux != null){
                    C.add(aux);
                }
            });
        });

        return C;
    }

    Ir_A(Edos, Simb){
        C = new Set();
        C.clear();
        C = this.cerraduraEpsilon(MoverMas(Edos, Simb));
        return C;
    }
}