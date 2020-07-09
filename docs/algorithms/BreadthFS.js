// Input Matrix representing Grid
// Start Position and End Position
// Breadth First Search -> Partial Passable Walls are treated as Solid Impassable Walls

function breadthFS(gridMatrix, startPos, endPos, allowDiagonal=true, biDirectional=false){
    startPos = startPos || [-1, -1];
    endPos = endPos || [-1, -1];
    if(startPos[0]==-1 || startPos[1]==-1 || endPos[0]==-1 || endPos[1]==-1){
        return [];
    }
    let queue = [];
    let rows = 50, cols = 50;
    let visited = new Array(rows);
    let path = new Array(rows);
    for(x=0; x<rows; ++x){
        visited[x] = new Array(cols);
        path[x] = new Array(cols);
        for(y=0; y<cols; y++){
            visited[x][y] = 0;
            path[x][y] = [-1, -1];
        }
    }
    let verticesExplored = new Array();
    if(biDirectional==false){
        queue.push(startPos);
        while(queue.length != 0){
            currentNode = queue.shift();
            let currentVerticesExplored = new Array();
            visited[currentNode[0]][currentNode[1]] = 1;
            // Top Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[0]>=1 && ['.', 'E'].includes(gridMatrix[currentNode[0]-1][currentNode[1]]) &&
            visited[currentNode[0]-1][currentNode[1]]==0){
                currentVerticesExplored.push([currentNode[0]-1, currentNode[1]]);
                queue.push([currentNode[0]-1, currentNode[1]]);
                path[currentNode[0]-1][currentNode[1]] = currentNode;
                visited[currentNode[0]-1][currentNode[1]] = 1;
            }
            // Down Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[0]<(rows-1) && ['.', 'E'].includes(gridMatrix[currentNode[0]+1][currentNode[1]]) &&
            visited[currentNode[0]+1][currentNode[1]]==0){
                currentVerticesExplored.push([currentNode[0]+1, currentNode[1]]);
                queue.push([currentNode[0]+1, currentNode[1]]);
                path[currentNode[0]+1][currentNode[1]] = currentNode;
                visited[currentNode[0]+1][currentNode[1]] = 1;
            }
            // Left Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[1]>=1 && ['.', 'E'].includes(gridMatrix[currentNode[0]][currentNode[1]-1]) &&
            visited[currentNode[0]][currentNode[1]-1]==0){
                currentVerticesExplored.push([currentNode[0], currentNode[1]-1]);
                queue.push([currentNode[0], currentNode[1]-1]);
                path[currentNode[0]][currentNode[1]-1] = currentNode;
                visited[currentNode[0]][currentNode[1]-1] = 1;
            }
            // Right Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if(currentNode[1]<(cols-1) && ['.', 'E'].includes(gridMatrix[currentNode[0]][currentNode[1]+1]) &&
            visited[currentNode[0]][currentNode[1]+1]==0){
                currentVerticesExplored.push([currentNode[0], currentNode[1]+1]);
                queue.push([currentNode[0], currentNode[1]+1]);
                path[currentNode[0]][currentNode[1]+1] = currentNode;
                visited[currentNode[0]][currentNode[1]+1] = 1;
            }
            // Diagonal Cells -- Only When Diagonal Movement is Allowed
            // Top-Right Cell
            if(currentNode[0]-1>=0 && currentNode[1]+1<cols && ['.', 'E'].includes(gridMatrix[currentNode[0]-1][currentNode[1]+1]) &&
            visited[currentNode[0]-1][currentNode[1]+1]==0 && allowDiagonal==true){
                currentVerticesExplored.push([currentNode[0]-1, currentNode[1]+1]);
                queue.push([currentNode[0]-1, currentNode[1]+1]);
                path[currentNode[0]-1][currentNode[1]+1] = currentNode;
                visited[currentNode[0]-1][currentNode[1]+1] = 1;
            }
            // Top-Left Cell
            if(currentNode[0]-1>=0 && currentNode[1]-1>=0 && ['.', 'E'].includes(gridMatrix[currentNode[0]-1][currentNode[1]-1]) &&
            visited[currentNode[0]-1][currentNode[1]-1]==0 && allowDiagonal==true){
                currentVerticesExplored.push([currentNode[0]-1, currentNode[1]-1]);
                queue.push([currentNode[0]-1, currentNode[1]-1]);
                path[currentNode[0]-1][currentNode[1]-1] = currentNode;
                visited[currentNode[0]-1][currentNode[1]-1] = 1;
            }
            // Bottom-Left Cell
            if(currentNode[0]+1<rows && currentNode[1]-1>=0 && ['.', 'E'].includes(gridMatrix[currentNode[0]+1][currentNode[1]-1]) &&
            visited[currentNode[0]+1][currentNode[1]-1]==0 && allowDiagonal==true){
                currentVerticesExplored.push([currentNode[0]+1, currentNode[1]-1]);
                queue.push([currentNode[0]+1, currentNode[1]-1]);
                path[currentNode[0]+1][currentNode[1]-1] = currentNode;
                visited[currentNode[0]+1][currentNode[1]-1] = 1;
            }
            // Bottom-Right Cell
            if(currentNode[0]+1<rows && currentNode[1]+1<cols && ['.', 'E'].includes(gridMatrix[currentNode[0]+1][currentNode[1]+1]) &&
            visited[currentNode[0]+1][currentNode[1]+1]==0 && allowDiagonal==true){
                currentVerticesExplored.push([currentNode[0]+1, currentNode[1]+1]);
                queue.push([currentNode[0]+1, currentNode[1]+1]);
                path[currentNode[0]+1][currentNode[1]+1] = currentNode;
                visited[currentNode[0]+1][currentNode[1]+1] = 1;
            }
            verticesExplored.push(currentVerticesExplored);
            if(visited[endPos[0]][endPos[1]]==1){
                break;
            }
        }
    }
    if(visited[endPos[0]][endPos[1]]==0){
        return [verticesExplored, []];
    }
    pathVertices = new Array();
    currentNode = endPos;
    pathVertices.push(currentNode);
    while(currentNode!=[-1, -1] && currentNode!=startPos){
        pathVertices.push(path[currentNode[0]][currentNode[1]]);
        currentNode = path[currentNode[0]][currentNode[1]];
    }
    return [verticesExplored, pathVertices];
}