class Node {
    constructor(args = {}) {
        Object.assign(this, {
            symbol: null,
            isTerminal: true,
            token: null,
            next: null
        }, args);
    }
}

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(obj) {
        if (this.isEmpty())
            this.head = this.tail = new Node(obj);
        else
            this.tail.next = this.tail = new Node(obj);
    }

    addHead(obj) {
        var aux = new Node(obj);
        aux.next = this.head;
        this.head = aux;
    }

    pop() {
        var aux = this.head;
        if (aux.next !== null) {
            while (aux.next !== this.tail)
                aux = aux.next;
            delete this.tail;
            aux.next = null;
            this.tail = aux;
        } else {
            delete this.head;
            this.head = null;
            this.tail = null;
        }
    }

    remove() {
        this.head = this.head.next;
    }

    isEmpty() {
        return this.head === null;
    }

    setTerminals(noTerminalsSet, terminalsSet) {
        var aux = this.head
        while (aux !== null) {
            if (noTerminalsSet.has(aux.symbol))
                aux.isTerminal = false
            else
                terminalsSet.add(aux.symbol)
            aux = aux.next
        }
    }

    toList() {
        var l = []
        var aux = this.head
        while (aux !== null) {
            l.push(aux.symbol)
            aux = aux.next
        }
        return l
    }
}