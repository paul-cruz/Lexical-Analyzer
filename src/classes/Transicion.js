export default class Transicion {

    constructor(simbInf, simbSup, edo) {
        this.__simbInf__ = simbInf ? simbInf : null;
        this.__simbSup__ = simbSup ? simbSup : this.__simbInf__;
        this.__edo__ = edo ? edo : null;
    }

    setRangeTransition(s1, s2, e) {
        this.__simbInf__ = s1;
        this.__simbSup__ = s2;
        this.edo = e;
    }

    setUniqueTransition(s1, e) {
        this.__simbInf__ = s1;
        this.__simbSup__ = s1;
        this.edo = e;
    }

    get simbInf() {
        return this.__simbInf__;
    }

    get simbSup() {
        return this.__simbSup__;
    }

    set simbInf(s1) {
        this.__simbInf__ = s1;
    }

    set simbSup(s1) {
        this.__simbSup__ = s1;
    }

    getEdoTrans(s) {
        if (this.__simbInf__ <= s && s <= this.__simbSup__) {
            return this.__edo__;
        }
        return null;
    }
    
}