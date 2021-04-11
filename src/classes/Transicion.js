class Transicion {

    constructor(simbInf, simbSup, edo) {
        this.simbInf = simbInf ? simbInf : null;
        this.simbSup = simbSup ? simbSup : this.simbInf;
        this.edo = edo ? edo : null;
    }

    setRangeTransition(s1, s2, e) {
        this.simbInf = s1;
        this.simbSup = s2;
        this.edo = e;
    }

    setUniqueTransition(s1, e) {
        this.simbInf = s1;
        this.simbSup = s1;
        this.edo = e;
    }

    getsimbInf() {
        return this.simbInf;
    }

    getsimbSup() {
        return this.simbSup;
    }

    set simbInf(s1) {
        this.setsimbInf = s1;
    }

    set simbSup(s1) {
        this.setsimbSup = s1;
    }

    getEdoTrans(s) {
        if (this.simbInf <= s && s <= this.simbSup) {
            return this.edo;
        }
        return null;
    }
    
}