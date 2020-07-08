
var path=[];
var begintime=0;
function heuristic(matrix,endPos){
    var rows = 50, cols = 50;
    
    var heur = new Array(rows);
    for (x = 0; x < matrix.length; ++x) {
       
        heur[x] = new Array(cols);
        for (y = 0; y < cols; y++) {
            
            heur[x][y] = Math.abs(endPos[0]-x)+Math.abs(endPos[1]-y);//manhattan distance from endpos
        }
    }
    return heur;
}

function findneigh(node, allowDiagonal, matrix) {
    var neighbours = [];
    var x = node[0];
    var y = node[1];
   // console.log(node);
    //console.log(matrix);
    for (i = -1; i <= 1; i++) {
        if (x + i < 50 && x+i>=0) {
            for (j = -1; j <= 1; j++) {
                if (y + j < 50 && y+j>=0) {
                    if (i == j) {
                        if (i == 0) continue;
                        console.log(x + i, matrix[x + i]);
                        if (allowDiagonal && matrix[x + i][y + j] !== '#' && matrix[x + i][y + j] !== '*') {
                            neighbours.push([x + i, y + j]);
                        }
                    }
                    else {
                        if (matrix[x + i][y + j] !== '#' && matrix[x + i][y + j] !== '*') {
                            neighbours.push([x + i, y + j]);
                        }
                    }
                }
            }
        }
    }
    return neighbours;
}

function search(node, g, thr, endPos, allowDiagonal, timelim, matrix, heur) {
   // console.log(heur);
    var currdate = new Date();
    curtime = currdate.getTime();
   var  diff = curtime - begintime;
    if(diff>timelim){
        return -2;
    }
    console.log(node, thr, g, heur[node[0]][node[1]]);
   
    var f = g + heur[node[0]][node[1]];
    //console.log(f);
    path.push(node);
    if (f > thr) return f;
    if (node[0] == endPos[0]&& node[1]==endPos[1]) return -1;
    var neighbours = findneigh(node, allowDiagonal, matrix);
    var neighl = neighbours.length;// 3d array with ith entry having x and y coordinates in grid matrix
    var mnthr = timelim + 1;
    for (i = 0; i < neighl; i++) {
       // co
        var res = search(neighbours[i], g + 1, thr, endPos, allowDiagonal, timelim, matrix, heur);
        if (res == -1) return -1;
        path.pop()
        if (res < mnthr){
            mnthr = res;
        }
    }
    return mnthr;


}

function idastar(matrix, startPos, endPos, allowDiagonal = true, biDirectional = false, timelim=10000){
 //  console.log("ye")
    path=[];
    cutoff=timelim;
   console.log(startPos,endPos);
    heur=heuristic(matrix,endPos);
    
   // console.log(matrix);
    var thr=heur[startPos[0]][startPos[1]];
    
    //final-- array of explored vertices
    var begdate=new Date();
    begintime=begdate.getTime();
    var curtime=begintime;
    var dif=curtime-begintime;
    while(dif<=timelim){
        var res=search(startPos,0,thr,endPos,allowDiagonal,timelim,matrix,heur);
        if(res==-1){
            //add final path
            console.log(path);
            grid = document.getElementById("grid");
            ctx = grid.getContext("2d");
            for(i=0;i<path.length-1;i++){
                ctx.fillStyle = "#af03fcbe";
                x=path[i][0];
                y=path[i][1];
                ctx.fillRect(x * sz, y * sz, sz, sz);
            }
            return res;
        }
        else if(res==-2){
            alert("Time Limit Exceeded");
            return;
        }
        var currdate=new Date();
        curtime=currdate.getTime();
        diff=curtime-begintime;
        // if(res>=timelim){
        //     //add -1 to final
        //     return res;
        // } 
        //console.log(thr);
        thr=res;
    }

}



