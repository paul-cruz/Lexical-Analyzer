function contadorIdEstado(){
    if(typeof contadorIdEstado.counter == "undefined"){
        contadorIdEstado.counter = 0;
    }
    return contadorIdEstado.counter++;
}
export default class Estado {
    //static contadorIdEstado = 0;
    constructor() {
        this.EdoAcept = false;
        this.Token = -1;
        this.IdEstado = contadorIdEstado();
        this.Trans = new Set();
    }

    EdoAcept(e) {
        this.EdoAcept = e;
    }

    Token(t) {
        this.Token = t;
    }

    IdEstado(id) {
        this.IdEstado = id;
    }

    Trans(tr) {
        this.Trans = tr;
    }
}