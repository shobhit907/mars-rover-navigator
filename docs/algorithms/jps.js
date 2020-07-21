// Jump Point Search Algorithm

// Search Recursively in the direction parent->child untill a jump point is found
function jump_point(x, y, px, py, startPos, endPos, gridMatrix, dim1, dim2){
    // If An Invalid Point is Given as a Parameter return [-1, -1]
    // If the current Node is Blocked then return [-1, -1]
    if(x===-1 || y===-1 || gridMatrix[x][y]=='#' || gridMatrix[x][y]=='*' || (x>=dim1 || y>=dim2)){
        return [-1, -1];
    }
    // If the current Node is the end Node then return this node as the jump point
    if(x==endPos[0] && y==endPos[1]){
        return [x, y];
    }
    
    // Setting the direction
    var dx = x - px, dy = y - py;
    if(x+dx>=dim1 || y+dy>=dim2 || x-dx<0 || y-dy<0){
        return [-1, -1];
    }
    // Self Jump-Point Test (checking if there is any forced neighbour) [X] Tested
    if(dx!==0 && dy!==0){
        // - + +        x: obstacles
        // x n +        +: natural neighbours
        // p x -        -: forced neighbours
        var a = gridMatrix[x-dx][y+dy]==='.';
        var b = (gridMatrix[x-dx][y]==='#') || (gridMatrix[x-dx][y]==='*');
        var c = a && b; 
        a = gridMatrix[x+dx][y-dy]==='.';
        b = (gridMatrix[x][y-dy]==='#') || (gridMatrix[x][y-dy]==='*');
        var d = a && b;
        if(c || d){
            return [x, y];
        }
    }
    else{
        if(dx!=0){
            if((gridMatrix[x+dx][y+1]==='.' && (gridMatrix[x][y+1]==='#' || gridMatrix[x][y+1]==='*'))
            || (gridMatrix[x+dx][y-1]==='.' && (gridMatrix[x][y-1]==='#' || gridMatrix[x][y-1]==='*'))){
                return [x, y];
            }
        }
        else if(dy!=0){
            if((gridMatrix[x+1][y+dy]==='.' && (gridMatrix[x+1][y]==='#' || gridMatrix[x+1][y]==='*'))
            || (gridMatrix[x-1][y+dy]==='.' && (gridMatrix[x-1][y]==='#' || gridMatrix[x-1][y]==='*'))){
                return [x, y];
            }
        }
        else{
            console.log("No Gradient!!!");
            return [x, y];
        }
    }
    // Diagonal move long distance straight direction jump point test
    if(dx!==0 && dy!==0){
        a = jump_point(x+dx, y, x, y, startPos, endPos, gridMatrix, dim1, dim2);
        b = jump_point(x, y+dy, x, y, startPos, endPos, gridMatrix, dim1, dim2);
        if(!(a[0]==-1 && a[1]==-1) || !(b[0]==-1 && b[1]==-1)){
            return [x, y];
        }
    }

    // This is not the jump point Search Other
    return jump_point(x+dx, y+dy, x, y, startPos, endPos, gridMatrix, dim1, dim2);
}

// Utility Function
function valid(x, y, dim1, dim2){
    if(x<0 || y<0){
        return false;
    }
    if(x>=dim1 || y>=dim2){
        return false;
    }
    return true;
}

// Function to return the neighbours of the node
function neighbours(x, y, px, py, gridMatrix, dim1, dim2){
    // If the parent node is NULL return all neighbours
    if(px===-1 || py===-1){
        var pos = [[1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
        var neigh = [];
        for(var i=0; i<8; ++i){
            var current = pos[i];
            if(valid(x+current[0], y+current[1], dim1, dim2)){
                neigh.push([x+current[0], y+current[1]]);
            }
        }
        return neigh;
    }
    // Otherwise return neighbours based on jps algorithm
    else{
        var neigh = [];
        if(dx!==0 && dy!==0){
            if(gridMatrix[x][y+dy]=='.'){
                neigh.push([x, y+dy]);
            }
            if(gridMatrix[x+dx][y]=='.'){
                neigh.push([x+dx, y]);
            }
            if(gridMatrix[x+dx][y+dy]=='.'){
                neigh.push([x+dx, y+dy]);
            }
            if(gridMatrix[x-dx][y]=='#' || gridMatrix[x-dx][y]=='*'){
                neigh.push([x-dx, y+dy]);
            }
            if(gridMatrix[x][y-dy]=='#' || gridMatrix[x][y-dy]=='*'){
                neigh.push([x+dx, y-dy]);
            }
        }
        else{
            if(dy!=0){
                if(gridMatrix[x][y+dy]=='.'){
                    neigh.push([x, y+dy]);
                }
                if(gridMatrix[x+1][y]=='.'){
                    neigh.push([x+1, y+dy]);
                }
                if(gridMatrix[x-1][y]=='.'){
                    neigh.push([x-1, y+dy]);
                }
            }
            if(dx!=0){
                if(gridMatrix[x+dx][y]=='.'){
                    neigh.push([x+dx, y]);
                }
                if(gridMatrix[x][y+1]=='.'){
                    neigh.push([x+dx, y+1]);
                }
                if(gridMatrix[x][y-1]=='.'){
                    neigh.push([x+dx, y-1]);
                }
            }
            return neigh;
        }
    }
}



var gridMatrix = [['#', '#', '#'],
                  ['.', '.', '.'],
                  ['#', '.', '#']]
console.log(jump_point(2, 1, 1, 1, [1, 0], [2, 2], gridMatrix, 3, 3));