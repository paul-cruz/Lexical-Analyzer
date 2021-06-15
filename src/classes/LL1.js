export default class LL1{
    constructor(rulesArray, noTerminals, terminals){
        this.rules = rulesArray;
        this.noTerminals = noTerminals;
        this.terminals = terminals;
    }

    first(ruleIn){
        var aux = ruleIn.head;
        var firstSet = new Set();
        if(this.terminals.has(aux.symbol)){
            firstSet.add(aux.symbol);
        }else{
            var au = aux.next;
            if(this.terminals.has(au.symbol)){
                firstSet.add(au.symbol); 
            }
            this.rules.forEach(rule=>{
                if(rule.head.symbol === au.symbol){
                    firstSet = new Set([...firstSet, ...this.first(rule)]);
                }
            })
        }
        return firstSet;
    }

    follow(simb){
        console.log("Follow simbolo: " + simb);
        var followSet = new Set();
        var i = 0;
        this.rules.forEach(rule =>{
            var aux = rule.head.next;
            while(aux!==null){
                if(aux.symbol === simb){
                    var  auxSet = new Set();
                    auxSet = this.first(aux);
                    if(i ===0){
                        auxSet.add("$");
                    }
                    if(auxSet.has("EPSILON")){
                        auxSet.delete("EPSILON");
                        followSet = new Set([...followSet, ...this.follow(rule.head.symbol)]);
                    }
                    followSet = new Set([...followSet, ...auxSet]);
                }
                aux = aux.next;
            }
            i++;
        })
        return followSet;
    }
}