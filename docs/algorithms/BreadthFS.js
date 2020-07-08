// Input Matrix representing Grid
// Start Position and End Position
// Breadth First Search -> Partial Passable Walls are treated as Solid Impassable Walls

'use strict';
function BreadthFS(gridMatrix, startPos, endPos, allowDiagonal=true, biDirectional=false){
    var queue = [startPos];
    var rows = 50, cols = 50;
    var visited = new Arrays(rows);
    var path = new Arrays(rows);
    for(x=0; x<gridMatrix.length; ++x){
        visited[x] = new Array(cols);
        path[x] = new Array(cols);
        for(y=0; y<cols; y++){
            visited[x][y] = 0;
            path[x][y] = [-1, -1];
        }
    }
    if(biDirectional==false){
        queue.push(startPos);
        while(queue.length != 0){
            currentNode = queue.shift();
            visited[currentNode[0]][currentNode[1]] = 1;
            // Top Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[0]>=1 && ['.', 'E'].includes(gridMatrix[currentNode[0]-1][currentNode[1]]) &&
            visited[currentNode[0]-1][currentNode[1]]==0){
                queue.push([currentNode[0]-1, currentNode[1]]);
                path[currentNode[0]-1][currentNode[1]] = startPos;
            }
            // Down Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[0]<(row-1) && ['.', 'E'].includes(gridMatrix[currentNode[0]+1][currentNode[1]]) &&
            visited[currentNode[0]+1][currentNode[1]]==0){
                queue.push([currentNode[0]+1, currentNode[1]]);
                path[currentNode[0]+1][currentNode[1]] = startPos;
            }
            // Left Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[1]>=1 && ['.', 'E'].includes(gridMatrix[currentNode[0]][currentNode[1]-1]) &&
            visited[currentNode[0]][currentNode[1]-1]==0){
                queue.push([currentNode[0], currentNode[1]-1]);
                path[currentNode[0]][currentNode[1]-1] = startPos;
            }
            // Right Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[1]<(cols-1) && ['.', 'E'].includes(gridMatrix[currentNode[0]][currentNode[1]+1]) &&
            visited[currentNode[0]][currentNode[1]+1]==0){
                queue.push([currentNode[0], currentNode[1]+1]);
                path[currentNode[0]][currentNode[1]+1] = startPos;
            }
            // Diagonal Cells -- Only When Diagonal Movement is Allowed
            // Top-Right Cell
            if(currentNode[0]-1>=0 && currentNode[1]+1<cols && ['.', 'E'].includes(gridMatrix[currentNode[0]-1][currentNode[1]+1]) &&
            visited[currentNode[0]-1][currentNode[1]+1]==0 && allowDiagonal==true){
                queue.push([currentNode[0]-1, currentNode[1]+1]);
                path[currentNode[0]-1][currentNode[1]+1] = startPos;
            }
            // Top-Left Cell
            if(currentNode[0]-1>=0 && currentNode[1]-1>=0 && ['.', 'E'].includes(gridMatrix[currentNode[0]-1][currentNode[1]-1]) &&
            visited[currentNode[0]-1][currentNode[1]-1]==0 && allowDiagonal==true){
                queue.push([currentNode[0]-1, currentNode[1]-1]);
                path[currentNode[0]-1][currentNode[1]-1] = startPos;
            }
            // Bottom-Left Cell
            if(currentNode[0]+1<row && currentNode[1]-1>=0 && ['.', 'E'].includes(gridMatrix[currentNode[0]+1][currentNode[1]-1]) &&
            visited[currentNode[0]+1][currentNode[1]-1]==0 && allowDiagonal==true){
                queue.push([currentNode[0]+1, currentNode[1]-1]);
                path[currentNode[0]+1][currentNode[1]-1] = startPos;
            }
            // Bottom-Right Cell
            if(currentNode[0]+1<row && currentNode[1]+1<cols && ['.', 'E'].includes(gridMatrix[currentNode[0]+1][currentNode[1]+1]) &&
            visited[currentNode[0]+1][currentNode[1]+1]==0 && allowDiagonal==true){
                queue.push([currentNode[0]+1, currentNode[1]+1]);
                path[currentNode[0]+1][currentNode[1]+1] = startPos;
            }
        }
    }
    else{
        // Code For Bi-Directional Search
    }
    return path;
}