var level = 0;
var id;

function plotPathAndVertices(output) {
    clearPath();
    level = 0;
    id = setInterval(plotCurrentVerticesExplored, 30, output);

}

function plotCurrentVerticesExplored(vertices_explored) {
    if (level == vertices_explored[0].length) {
        clearInterval(id);
        level = 0;
        id = setInterval(plotPath, 50, vertices_explored[1]);
    } else {
        grid = document.getElementById("grid");
        ctx = grid.getContext("2d");
        if(level>0){
            for (let vert1 of vertices_explored[0][level-1]) {
                // console.log(vert);
                if (vert1[0] == endPos[0] && vert1[1] == endPos[1]) {
                    continue;
                }
                ctx.clearRect(vert1[0] * sz, vert1[1] * sz, sz, sz);
                ctx.strokeStyle="black";
                ctx.strokeRect(vert1[0] * sz, vert1[1] * sz, sz, sz);
                ctx.fillStyle = "#3B7";
                ctx.fillRect(vert1[0] * sz, vert1[1] * sz, sz, sz);
            }
        }
        for (let vert of vertices_explored[0][level]) {
            // console.log(vert);
            if (vert[0] == endPos[0] && vert[1] == endPos[1]) {
                continue;
            }
            ctx.clearRect(vert[0] * sz, vert[1] * sz, sz, sz);
            ctx.strokeStyle="black";
            ctx.strokeRect(vert[0] * sz, vert[1] * sz, sz, sz);
            ctx.fillStyle = "#AFEEEE";
            ctx.fillRect(vert[0] * sz, vert[1] * sz, sz, sz);
        }
        level++;
    }
}

function plotPath(path) {
    if (level == path.length - 1) {
        clearInterval(id);
    } else {
        grid = document.getElementById("grid");
        ctx = grid.getContext("2d");
        ctx.strokeStyle = "#FCEF2D";
        ctx.beginPath();
        ctx.moveTo(path[level][0] * sz + sz / 2, path[level][1] * sz + sz / 2);
        ctx.lineTo(path[level + 1][0] * sz + sz / 2, path[level + 1][1] * sz + sz / 2);
        ctx.stroke();
        level++;
    }
}