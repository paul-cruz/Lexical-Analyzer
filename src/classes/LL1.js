export default class LL1{
    constructor(rulesArray, noTerminals, terminals){
        this.rules = rulesArray;
        this.noTerminals = noTerminals;
        this.terminals = terminals;
    }

    first(ruleIn, i){
        var aux = ruleIn[i];
        var firstSet = new Set();
        if(this.terminals.has(aux)){
            firstSet.add(aux);
        }else{
            this.rules.forEach(rule=>{
                var ar = rule.toList();
                if(ar[0] === aux){
                    var au = ar[1];
                    if(this.terminals.has(au)){
                        firstSet.add(au); 
                    }else{
                        firstSet = new Set([...firstSet, ...this.first(ar,1)]);
                    }
                    
                }
            })
        }
        return firstSet;
    }

    follow(simb){
        //console.log("Follow simbolo: " + simb);
        var followSet = new Set();
        var i = 0;
        var j = 0;
        var simbIni;
        this.rules.forEach(rule =>{
            var aux = rule.toList();
            if(i === 0 && aux[0] === simb){
                simbIni = aux[0];
            }           
            for(j =1; j<aux.length; j++){
                if(aux[j] === simb){
                    var  auxSet = new Set();  
                    if(j === aux.length-1){
                        if(aux[0]!==simb)
                        auxSet = new Set([...auxSet, ...this.follow(aux[0])]);
                    }else{
                        auxSet = new Set([...auxSet, ...this.first(aux, j+1)]);
                        if(auxSet.has("EPSILON")){
                            auxSet.delete("EPSILON");
                            if(aux[0]!==simb)
                            auxSet = new Set([...auxSet, ...this.follow(aux[0])]);
                        }
                    }
                    followSet = new Set([...followSet, ...auxSet]);
                }
            }
            i = i+1;
        });
        if(simbIni === simb){
            followSet.add("$");
        }
        return followSet;
    }
}