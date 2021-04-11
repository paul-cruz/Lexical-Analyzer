export default class Estado {
    static contadorIdEstado = 0;
    constructor() {
        this.EdoAcept = false;
        this.Token = -1;
        this.IdEstado = this.contadorIdEstado++;
        this.Trans.clear();
    }

    set EdoAcept(e) {
        this.EdoAcept = e;
    }

    set Token(t) {
        this.Token = t;
    }

    set IdEstado(id) {
        this.IdEstado = id;
    }

    set Trans(tr) {
        this.Trans = tr;
    }
}