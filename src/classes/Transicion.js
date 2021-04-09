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
        simbinf = s1;
        simbsup = s2;
        edo = e;
    }

    setTransicion(s1, e){
        simbinf = s1;
        simbsup = s1;
        edo = e;
    }

    getSimbinf(){
        return simbinf;
    }

    getSimbsup(){
        return simbsup;
    }

    setSimbinf(s1){
        this.setSimbinf = s1;
    }

    setSimbsup(s1){
        this.setSimbsup = s1;   
    }

    getEdoTrans(s){
        if(simbinf <= s && s <= simbsup){
            return edo;
        }
        return null;
    }

    
}