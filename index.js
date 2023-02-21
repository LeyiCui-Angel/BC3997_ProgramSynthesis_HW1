function synth(){
    // Get inputs
    i = document.getElementById("in").value;
    o = document.getElementById("out").value;
    const iArray = i.split(",");
    const oArray = o.split(",");
    // Check inputs
    if (iArray.length != oArray.length){
        document.getElementById("result").value = "Input/output format incorrect. Please check.";
        return;
    }
    else if (iArray[0] == ''){
        document.getElementById("result").value = "No input/output.";
        return;
    }
    var func = [];
    document.getElementById("result").value = (compute(iArray, oArray, func, 0,0));
}

function compute(input,output,func,count,betaIn){
    if (count > 2){
        return "Couldn't find a solution";
    }
    var next = [];
    var lang = ["1","2","3","4","5","6","7","8","9"];
    var ops = ["+", "-","/","*"];
    if(func.length==0){
        for (const l of lang) {
            for (const b of ops) {
                var c=0;
                for(let i=0; i<input.length; i++){
                    var equa = input[i]+b+l;
                    console.log("the equation: "+equa);
                    console.log("get output: "+eval(equa));
                    console.log("expected output: "+output[i]);
                    if (eval(equa)==output[i]){
                        c++;
                        if (c==input.length){
                            return b+l;
                        }
                    }
                    next.push(b+l);
                }
            }
        }
    }
    else {
        for (const f of func) {
            for (const l of lang) {
                for (const b of ops) {
                    var c=0;
                    for(let i=0; i<input.length; i++){
                        var equa = input[i]+f+b+l;
                        console.log("the equation: "+equa);
                        console.log("get output: "+eval(equa));
                        console.log("expected output: "+output[i]);
                        if (eval(equa)==output[i]){
                            c++;
                            if (c==input.length){
                                return f+b+l;
                            }
                        }
                        else if (eval(equa) > output[i]){
                            if ((eval(equa) - output[i]) < betaIn){
                                betaIn = (eval(equa) - output[i]);
                                next.push(f+b+l);
                            }
                        }
                        else {
                            if((output[i] - eval(equa)) < betaIn){
                                betaIn = (output[i] - eval(equa));
                                next.push(f+b+l);
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("list to check: "+next);
    count++;
    return compute(input,output,next,count,betaIn);
}