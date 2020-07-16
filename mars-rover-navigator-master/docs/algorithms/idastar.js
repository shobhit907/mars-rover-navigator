
var path = [];
var begintime = 0;
var prx, pry;

function manhattanHeuristic(pos1, pos2) {
    return Math.floor(Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]));
}

function euclideanHeuristic(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
}

function chebyshevHeuristic(pos1, pos2) {
    return Math.max(Math.abs(pos1[0] - pos2[0]), Math.abs(pos1[1] - pos2[1]));
}

function octileHeuristic(pos1, pos2) {
    let F = Math.SQRT2 - 1;
    dx = Math.abs(pos1[0] - pos2[0]);
    dy = Math.abs(pos1[1] - pos2[1]);
    return (dx < dy) ? F * dx + dy : F * dy + dx;
}

function getheuristic(matrix, endPos,heuristic) {
    let heuristicfunc = null;
   
    if (heuristic == "manhattan") {
        heuristicfunc = manhattanHeuristic;
    } else if (heuristic == "euclidean") {
        heuristicfunc = euclideanHeuristic;
    } else if (heuristic == "chebyshev") {
        heuristicfunc = chebyshevHeuristic;
    } else if (heuristic == "octile") {
        heuristicfunc = octileHeuristic;
    }

    var rows = 50, cols = 50;

    var heur = new Array(rows);
    for (x = 0; x < matrix.length; ++x) {

        heur[x] = new Array(cols);
        for (y = 0; y < cols; y++) {

            heur[x][y] = heuristicfunc(endPos,[x,y]);// Math.abs(endPos[0] - x) + Math.abs(endPos[1] - y);//manhattan distance from endpos
            
        }
    }
    return heur;
}

// function findneigh(node, allowDiagonal, matrix, parent) {
//     let neighbours = [];
//     let x = node[0];
//     let y = node[1];
//     // console.log(node);
//     //console.log(matrix);

//     for (i = 2 * prx - 1; i != 1 - 2 * prx + 1 - 2 * prx; i = i + 1 - 2 * prx) {
//         if (x + i < 50 && x + i >= 0) {

//             for (j = 2 * pry - 1; j != 1 - 2 * pry + 1 - 2 * pry; j = j + 1 - 2 * pry) {
//                 if (y + j < 50 && y + j >= 0) {

//                     if (Math.abs(i) !== Math.abs(j)) {
//                         if (matrix[x + i][y + j] !== '#') {
//                             if (parent[0] !== x + i || parent[1] !== y + j) {

//                                 neighbours.push([x + i, y + j]);
//                             }
//                         }

//                     }
//                     else {
//                         if (i == 0) continue;

//                         if (allowDiagonal && matrix[x + i][y + j] !== '#') {
//                             if (parent[0] !== x + i && parent[1] !== y + j) {
//                                 neighbours.push([x + i, y + j]);
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     return neighbours;
// }

function findneigh(node,allowDiagonal,matrix,parent){
    let vx=[0,0,1,-1,1,-1,-1,1];
    let vy=[1,-1,0,0,1,-1,1,-1];
    let neighbours=[];
    let xx=node[0],yy=node[1];
    for(let i=0;i<4;i++){
        if(xx+prx*vx[i]>=0 && xx+prx*vx[i]<rows && yy+pry*vy[i]>=0 && yy+pry*vy[i]<cols){
            if(matrix[xx+prx*vx[i]][yy+pry*vy[i]]!=='#' ){
                if (xx + prx*vx[i] === parent[0] && yy + pry*vy[i] === parent[1]) continue;
                neighbours.push([xx+prx*vx[i],yy+pry*vy[i]]);
            }
        }
    }
    if(allowDiagonal){
        for(let i=4;i<8;i++){
            if (xx + prx * vx[i] >= 0 && xx + prx * vx[i] < rows && yy + pry * vy[i] >= 0 && yy + pry * vy[i] < cols) {
                if (matrix[xx + prx * vx[i]][yy + pry * vy[i]] !== '#') {
                    if (xx + prx * vx[i] === parent[0] && yy + pry * vy[i] === parent[1]) continue;
                    neighbours.push([xx + prx * vx[i], yy + pry * vy[i]]);
                }
            }
        }
    }
    return neighbours;
}

function colornode(node, color) {
    grid = document.getElementById("grid");
    ctx = grid.getContext("2d");
    ctx.fillStyle = color;

    x = node[0];
    y = node[1];

    ctx.fillRect(x * sz, y * sz, sz, sz);
}
function colornode2(node, color) {
    grid = document.getElementById("grid");
    ctx = grid.getContext("2d");
    ctx.fillStyle = color;

    x = node[0];
    y = node[1];

    ctx.fillRect(x + 1 * sz, y + 1 * sz, sz - 2, sz - 2);
}
// function costnode(node, neighbour) {
//     //return Math.abs(node[0]-neighbour[0])+Math.abs(node[1]-neighbour[1]);
//     return (node[0] === neighbour[0] || node[1] === neighbour[1]) ? 1 : Math.SQRT2;
// }

function search(node, g, thr, endPos, allowDiagonal, timelim, matrix, heur, parent) {
    // console.log(heur);
    var currdate = new Date();
    curtime = currdate.getTime();
    var diff = curtime - begintime;
    if (diff > timelim) {
        return -2;
    }

    console.log("entered", node, thr, g, heur[node[0]][node[1]]);

    let f = g + heur[node[0]][node[1]];   
    if (f > thr) return f;

    setTimeout(colornode, 10, node, "rgba(13, 65, 175, 0.16)");
    
    if (node[0] == endPos[0] && node[1] == endPos[1]) return -1;
   
    let neighbours = findneigh(node, allowDiagonal, matrix, parent);
    console.log(neighbours);
    let neighl = neighbours.length;// 3d array with ith entry having x and y coordinates in grid matrix
    let mnthr = timelim + 1;
    for (let i = 0; i < neighl; i++) {
        // co
        let addg = 1;
        if (matrix[neighbours[i][0]][neighbours[i][1]] === '*') addg = costPassablewall;
        g = g + addg;
        path.push(neighbours[i]);
        let res = search(neighbours[i], g, thr, endPos, allowDiagonal, timelim, matrix, heur, node);
        console.log(node, neighbours[i], "index", i, mnthr, res);
        g = g - addg;
        if (res == -1) {
            //setTimeout(colornode, 20, node, "white");
            return -1;
        }
        path.pop()
        if (res < mnthr) {
            mnthr = res;
        }
    }

    console.log("left", node, thr, g, heur[node[0]][node[1]]);
    //  setTimeout(colornode2, 100, node, "white");
    return mnthr;


}

function idastar(matrix, startPos, endPos,heuristic, allowDiagonal, biDirectional = false, timelim = 100000) {
    path = [];
    cutoff = timelim;
    console.log(startPos, endPos);
    heur = getheuristic(matrix, endPos,heuristic);
    prx = endPos[0] > startPos[0];
    pry = endPos[1] > startPos[1];
    if(prx===false) prx=-1;
    if(pry===false) pry=-1;
    console.log(prx,pry);
    var thr = heur[startPos[0]][startPos[1]];

    var begdate = new Date();
    begintime = begdate.getTime();
    var curtime = begintime;
    var dif = curtime - begintime;
    
    while (dif < timelim) {
        var res = search(startPos, 0, thr, endPos, allowDiagonal, timelim, matrix, heur, [-1, -1]);
        if (res == -1) {
            //add final path
            console.log(path);
            var currdate = new Date();
            curtime = currdate.getTime();
            diff = curtime - begintime;
            console.log("Time Taken", diff);
            
            return [[], path];
        }
        else if (res == -2) {
            alert("Time Limit Exceeded");
            return [[],[startPos]];
        }
        var currdate = new Date();
        curtime = currdate.getTime();
        diff = curtime - begintime;

        thr = res;
    }

};



