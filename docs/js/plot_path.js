let level = 0;
let id;
let whichfunction;
let output;
let stopOption=true;

function plotPathAndVertices(out) {
    clearPath();
    output=out;
    level = 0;
    whichfunction=plotCurrentVerticesExplored;
    document.getElementById("stop-search").innerHTML="STOP SEARCH";
    document.getElementById("stop-search").disabled=false;
    clearInterval(id);
    id = setInterval(plotCurrentVerticesExplored, 30, output);
    // console.log(id);
}

function plotCurrentVerticesExplored(output) {
    if (level == output[0].length) {
        clearInterval(id);
        level = 0;
        whichfunction=plotPath;
        id = setInterval(plotPath, 30, output);
    } else {
        grid = document.getElementById("grid");
        ctx = grid.getContext("2d");
        for (let vert of output[0][level]) {
            // console.log(vert);
            if (vert[0] == endPos[0] && vert[1] == endPos[1]) {
                continue;
            }
            ctx.clearRect(vert[0] * sz, vert[1] * sz, sz, sz);
            ctx.strokeStyle="black";
            ctx.strokeRect(vert[0] * sz, vert[1] * sz, sz, sz);
            ctx.fillStyle = "#3B7";
            ctx.fillRect(vert[0] * sz, vert[1] * sz, sz, sz);
        }
        level++;
    }
}

function plotPath(output) {
    if (level == output[1].length - 1) {
        clearInterval(id);
        whichfunction=null;
        document.getElementById("stop-search").disabled=true;
        document.getElementById("stop-search").innerHTML="STOP SEARCH";
    } else {
        grid = document.getElementById("grid");
        ctx = grid.getContext("2d");
        ctx.strokeStyle = "#FCEF2D";
        ctx.beginPath();
        ctx.moveTo(output[1][level][0] * sz + sz / 2, output[1][level][1] * sz + sz / 2);
        ctx.lineTo(output[1][level + 1][0] * sz + sz / 2, output[1][level + 1][1] * sz + sz / 2);
        ctx.stroke();
        level++;
    }
}


function stopSearch(event){
    if(stopOption){
        clearInterval(id);
        document.getElementById("stop-search").innerHTML="RESTART SEARCH";
    }else{
        id=setInterval(whichfunction,30,output);
        document.getElementById("stop-search").innerHTML="STOP SEARCH";
    }
    stopOption=!stopOption;
}