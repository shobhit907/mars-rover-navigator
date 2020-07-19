
var path = [];
var begintime = 0;
var prx, pry;

//heuristics
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

//create matrix with heuristic values of each position wrt endPos
function getheuristic(matrix, endPos,heuristic) {
    heuristicfunc = null;
   
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
    vis=new Array(rows);
    for (x = 0; x < matrix.length; ++x) {

        heur[x] = new Array(cols);
        vis[x]=new Array(cols);
        for (y = 0; y < cols; y++) {

            heur[x][y] = heuristicfunc(endPos,[x,y]);// Math.abs(endPos[0] - x) + Math.abs(endPos[1] - y);//manhattan distance from endpos
            vis[x][y]=0;
        }
    }
    return heur;
};

//return list of neighbours of node, excluding parent node
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
    //if diagonal neighbours allowed, add them to list
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

//color nodes explored recursively
function colornode(node, color) {
    grid = document.getElementById("grid");
    ctx = grid.getContext("2d");
    ctx.fillStyle = color;

    x = node[0];
    y = node[1];

    ctx.fillRect(x * sz, y * sz, sz, sz);
}

//reset them to original state after realisiing they are not on path, left for now
// function colornode2(node, color) {
//     grid = document.getElementById("grid");
//     ctx = grid.getContext("2d");
//     //ctx.fillStyle = color;

//     x = node[0];
//     y = node[1];
//     ctx.clearRect(x*sz +1, y*sz +1, sz-2, sz-2);
//    // ctx.fillRect(x + 1 * sz, y + 1 * sz, sz - 2, sz - 2);
// }

//recursive search function
function search(node, g, thr, endPos, allowDiagonal, timelim, matrix, heur, parent,showrec,weight) {

   //checking for timelimit
    var currdate = new Date();
    curtime = currdate.getTime();
    var diff = curtime - begintime;
    if (diff > timelim) {
        return -2;
    }

   // console.log("entered", node, thr, g, heur[node[0]][node[1]]);

    let f = g + heur[node[0]][node[1]]*weight;   
    if (f > thr) //overshot the allowed threshold
    {
       // console.log("left", node, thr, g, heur[node[0]][node[1]]);
        return f;
    }

    //visualising recursion
    if(showrec)
        setTimeout(colornode, 10, node, "rgba(13, 65, 175, 0.16)");
    
    if (node[0] == endPos[0] && node[1] == endPos[1]) return -1; //endpos reached
   
    let neighbours = findneigh(node, allowDiagonal, matrix, parent);

    //an optimisation- to get better paths
    neighbours.sort(function (a, b) {
       return heuristicfunc(a, endPos) - heuristicfunc(b, endPos);
    });

  
    let neighl = neighbours.length;// 3d array with ith entry having x and y coordinates in grid matrix
    let mnthr = timelim + 1; //infinity
    for (let i = 0; i < neighl; i++) {
        
        //if node already exists on currently exploring path, do not visit it again
        if (vis[neighbours[i][0]][neighbours[i][1]]!==0) continue;
      
        let org=g;
        g=heuristicfunc(neighbours[i],startPos);

        //array storing nodes on path
        path.push(neighbours[i]);
        vis[neighbours[i][0]][neighbours[i][1]]=1;
        let res = search(neighbours[i], g, thr, endPos, allowDiagonal, timelim, matrix, heur, node,showrec,weight);
        
        //if endnode reached, return 
        if (res == -1) {
            //setTimeout(colornode, 20, node, "white");
            return -1;
        }

        //timelimit crossed, return
        if(res==-2){
            return -2;
        }

        //restore g
        g = org;

        //current neighbour not on path, set vis to 0
        vis[neighbours[i][0]][neighbours[i][1]] = 0;
        path.pop()

        //get min threshold for deepening
        if (res < mnthr) {
            mnthr = res;
        }
    }

   // console.log("left", node, thr, g, heur[node[0]][node[1]]);
    //  setTimeout(colornode2, 20000, node,);
    return mnthr;


}

function idastar(matrix, startPos, endPos,heuristic, allowDiagonal, showrec = true, timelim = 100000,weight) {
    
    path = [];
    cutoff = timelim;
   
    heur = getheuristic(matrix, endPos,heuristic);
    prx = endPos[0] > startPos[0];
    pry = endPos[1] > startPos[1];
    if(prx===false) prx=-1;
    if(pry===false) pry=-1;
    //console.log(prx,pry);

    //shortest possible path would be of heuristic score of startpos from endpos
    var thr = heur[startPos[0]][startPos[1]];

    var begdate = new Date();
    begintime = begdate.getTime();
    var curtime = begintime;
    var dif = curtime - begintime;
    
    //upper limit on time
    while (dif < timelim) {
        var res = search(startPos, 0, thr, endPos, allowDiagonal, timelim, matrix, heur, [-1, -1],showrec,weight);
        if (res == -1) {
            //add final path
            //console.log(path);
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

        //update threshold
        thr = res;
    }

};



