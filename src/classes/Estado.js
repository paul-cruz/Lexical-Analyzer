class Estado{
    static contadorIdEstado = 0;
    constructor(){
        this.EdoAceptEdoAcept = false;
        this.Token = -1;
        this.IdEstado = contadorIdEstado++;
        this.Trans.clear();
    }

    setEdoAcept(e){
        this.EdoAcept = e;
    }

    setToken(t){
        this.Token = t;
    }

    setIdEstado(id){
        this.IdEstado = id;
    }

    setTrans(tr){
        this.Trans = tr;
    }
}