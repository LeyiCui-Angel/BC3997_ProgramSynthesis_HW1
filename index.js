function synth(){
    i = document.getElementById("in").value;
    o = document.getElementById("out").value;
    const iArray = i.split(",");
    const oArray = o.split(",");
    if (iArray.length != oArray.length){
        document.getElementById("result").value = "Input/output format incorrect. Please check.";
        return;
    }
    else if (iArray[0] == ''){
        document.getElementById("result").value = "No input/output.";
        return;
    }

    r = firstRound(iArray[0], oArray[0]);
    newR = structuredClone(r);;

    if (iArray.length > 1){
        for (k = 1; k < iArray.length; k++){
            ii = iArray[k];
            oi = oArray[k];
            for (j = 0; j < r.length; j++){
                if(eval(ii + r[j]) != oi){
                    var newR = newR.filter(function(e) { return e !== r[j] });
                }
                if (newR.length == 0) {
                    document.getElementById("result").value = "Couldn't find a solution.";
                    return;
                }
            }
        }
    }
    document.getElementById("result").value = newR;

}

function firstRound(i, o){
    // Check addition
    resultAR = null;
    if (eval(o - i) >= 0) {
        var ar = eval("o-i");
        resultAR = "+" + ar;
    }
    // Check multiplication
    var mr = eval("o/i");
    resultMR = "*" + mr;
    // Check subtraction
    resultSR = null;
    if (eval(i - o) >= 0) {
        var sr = eval("i-o");
        resultSR = "-" + sr;
    }
    // Check integer division
    resultDR = null;
    if (Number.isInteger(i/o)) {
        var dr = eval("i/o");
        resultDR = "/" + dr;
    }

    results = [resultAR, resultMR, resultSR, resultDR];
    var filtered = results.filter(function (el) {
        return el != null;
    });

    return filtered;
}