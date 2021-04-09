class Transicion{
    constructor(simb, edo){
        this.simb = simb;
        this.edo = edo;
    }

    constructor(simbinf, simbsup, edo){
        this.simbinf = simbinf;
        this.simbsup = simbsup;
        this.edo = edo;
    }

    constructor(){
        this.edo = null;
    }

    setTransicion(s1, s2, e){
        this.simbinf = s1;
        this.simbsup = s2;
        this.edo = e;
    }

    setTransicion(s1, e){
        this.simbinf = s1;
        this.simbsup = s1;
        this.edo = e;
    }

    getSimbinf(){
        return this.simbinf;
    }

    getSimbsup(){
        return this.simbsup;
    }

    setSimbinf(s1){
        this.setSimbinf = s1;
    }

    setSimbsup(s1){
        this.setSimbsup = s1;   
    }

    getEdoTrans(s){
        if(this.simbinf <= s && s <= this.simbsup){
            return this.edo;
        }
        return null;
    }

    
}