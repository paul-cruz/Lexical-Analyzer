class Estado{
    static contadorIdEstado = 0;
    constructor(){
        EdoAcept = false;
        Token = -1;
        IdEstado = contadorIdEstado++;
        Trans.clear();
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