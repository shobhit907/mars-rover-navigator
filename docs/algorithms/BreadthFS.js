// Input Matrix representing Grid
// Start Position and End Position
// Breadth First Search -> Partial Passable Walls are treated as Solid Impassable Walls

function isNeighbor(point1, point2, allowDiagonal){
    var possiblePositions = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
    var neighbours = (allowDiagonal == false) ? 4 : 8;
    for(var i =0; i<neighbours; i++){
        var x = point1[0] + possiblePositions[i][0];
        var y = point1[1] + possiblePositions[i][1];
        if(x==point2[0] && y==point2[1]){
            console.log("Start And End Positions Are Adjacent...Returning Trivial Path");
            return true;
        }
    }
    return false;
}

function breadthFS(gridMatrix, startPos, endPos, allowDiagonal = true, biDirectional = false) {
    startPos = startPos || [-1, -1];
    endPos = endPos || [-1, -1];
    if (startPos[0] == -1 || startPos[1] == -1 || endPos[0] == -1 || endPos[1] == -1) {
        return [];
    }
    let queue = [];
    // Handling Corner Case
    var checkNeighbor = isNeighbor(startPos, endPos, allowDiagonal);
    if(checkNeighbor==true){
        return [[], [startPos, endPos]];
    }

    // Commenting Local Variables rows and cols
    // let rows = 50, cols = 50;
    let visited = new Array(rows);
    let path = new Array(rows);
    for (x = 0; x < rows; ++x) {
        visited[x] = new Array(cols);
        path[x] = new Array(cols);
        for (y = 0; y < cols; y++) {
            visited[x][y] = 0;
            path[x][y] = [-1, -1];
        }
    }
    let verticesExplored = new Array();
    if (biDirectional == false) {
        queue.push(startPos);
        while (queue.length != 0) {
            currentNode = queue.shift();
            let currentVerticesExplored = new Array();
            visited[currentNode[0]][currentNode[1]] = 1;
            // Top Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if (currentNode[0] >= 1 && ['.', 'E'].includes(gridMatrix[currentNode[0] - 1][currentNode[1]]) &&
                visited[currentNode[0] - 1][currentNode[1]] == 0) {
                currentVerticesExplored.push([currentNode[0] - 1, currentNode[1]]);
                queue.push([currentNode[0] - 1, currentNode[1]]);
                path[currentNode[0] - 1][currentNode[1]] = currentNode;
                visited[currentNode[0] - 1][currentNode[1]] = 1;
            }
            // Down Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if (currentNode[0] < (rows - 1) && ['.', 'E'].includes(gridMatrix[currentNode[0] + 1][currentNode[1]]) &&
                visited[currentNode[0] + 1][currentNode[1]] == 0) {
                currentVerticesExplored.push([currentNode[0] + 1, currentNode[1]]);
                queue.push([currentNode[0] + 1, currentNode[1]]);
                path[currentNode[0] + 1][currentNode[1]] = currentNode;
                visited[currentNode[0] + 1][currentNode[1]] = 1;
            }
            // Left Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if (currentNode[1] >= 1 && ['.', 'E'].includes(gridMatrix[currentNode[0]][currentNode[1] - 1]) &&
                visited[currentNode[0]][currentNode[1] - 1] == 0) {
                currentVerticesExplored.push([currentNode[0], currentNode[1] - 1]);
                queue.push([currentNode[0], currentNode[1] - 1]);
                path[currentNode[0]][currentNode[1] - 1] = currentNode;
                visited[currentNode[0]][currentNode[1] - 1] = 1;
            }
            // Right Cell -> Should Be Present, Should either be empty or End Point and Should Not be Visited
            if (currentNode[1] < (cols - 1) && ['.', 'E'].includes(gridMatrix[currentNode[0]][currentNode[1] + 1]) &&
                visited[currentNode[0]][currentNode[1] + 1] == 0) {
                currentVerticesExplored.push([currentNode[0], currentNode[1] + 1]);
                queue.push([currentNode[0], currentNode[1] + 1]);
                path[currentNode[0]][currentNode[1] + 1] = currentNode;
                visited[currentNode[0]][currentNode[1] + 1] = 1;
            }
            // Diagonal Cells -- Only When Diagonal Movement is Allowed
            // Top-Right Cell
            if (currentNode[0] - 1 >= 0 && currentNode[1] + 1 < cols && ['.', 'E'].includes(gridMatrix[currentNode[0] - 1][currentNode[1] + 1]) &&
                visited[currentNode[0] - 1][currentNode[1] + 1] == 0 && allowDiagonal == true) {
                currentVerticesExplored.push([currentNode[0] - 1, currentNode[1] + 1]);
                queue.push([currentNode[0] - 1, currentNode[1] + 1]);
                path[currentNode[0] - 1][currentNode[1] + 1] = currentNode;
                visited[currentNode[0] - 1][currentNode[1] + 1] = 1;
            }
            // Top-Left Cell
            if (currentNode[0] - 1 >= 0 && currentNode[1] - 1 >= 0 && ['.', 'E'].includes(gridMatrix[currentNode[0] - 1][currentNode[1] - 1]) &&
                visited[currentNode[0] - 1][currentNode[1] - 1] == 0 && allowDiagonal == true) {
                currentVerticesExplored.push([currentNode[0] - 1, currentNode[1] - 1]);
                queue.push([currentNode[0] - 1, currentNode[1] - 1]);
                path[currentNode[0] - 1][currentNode[1] - 1] = currentNode;
                visited[currentNode[0] - 1][currentNode[1] - 1] = 1;
            }
            // Bottom-Left Cell
            if (currentNode[0] + 1 < rows && currentNode[1] - 1 >= 0 && ['.', 'E'].includes(gridMatrix[currentNode[0] + 1][currentNode[1] - 1]) &&
                visited[currentNode[0] + 1][currentNode[1] - 1] == 0 && allowDiagonal == true) {
                currentVerticesExplored.push([currentNode[0] + 1, currentNode[1] - 1]);
                queue.push([currentNode[0] + 1, currentNode[1] - 1]);
                path[currentNode[0] + 1][currentNode[1] - 1] = currentNode;
                visited[currentNode[0] + 1][currentNode[1] - 1] = 1;
            }
            // Bottom-Right Cell
            if (currentNode[0] + 1 < rows && currentNode[1] + 1 < cols && ['.', 'E'].includes(gridMatrix[currentNode[0] + 1][currentNode[1] + 1]) &&
                visited[currentNode[0] + 1][currentNode[1] + 1] == 0 && allowDiagonal == true) {
                currentVerticesExplored.push([currentNode[0] + 1, currentNode[1] + 1]);
                queue.push([currentNode[0] + 1, currentNode[1] + 1]);
                path[currentNode[0] + 1][currentNode[1] + 1] = currentNode;
                visited[currentNode[0] + 1][currentNode[1] + 1] = 1;
            }
            verticesExplored.push(currentVerticesExplored);
            if (visited[endPos[0]][endPos[1]] == 1) {
                break;
            }
        }
        if (visited[endPos[0]][endPos[1]] == 0) {
            return [verticesExplored, []];
        }
        pathVertices = new Array();
        currentNode = endPos;
        pathVertices.push(currentNode);
        while (currentNode != [-1, -1] && currentNode != startPos) {
            pathVertices.push(path[currentNode[0]][currentNode[1]]);
            currentNode = path[currentNode[0]][currentNode[1]];
        }
        pathVertices.reverse();
        return [verticesExplored, pathVertices];
    }
    else {
        // Two Different Queues
        let startQueue = [];
        let endQueue = [];

        // Initiating the search
        startQueue.push(startPos);
        endQueue.push(endPos);

        // Match Node 
        var matchNode1 = [-1, -1];
        var matchNode2 = [-1, -1];

        // Running the Loop
        while (startQueue.length != 0 || endQueue.length != 0) {
            var startElement = [-1, -1];
            var endElement = [-1, -1];

            // Local variable to keep track of the cells explored in this round
            let currentVerticesExplored = new Array();

            // If startQueue is not Empty
            if (startQueue.length != 0) {
                startElement = startQueue.shift();
            }

            // If endQueue is not Empty
            if (endQueue.length != 0) {
                endElement = endQueue.shift();
            }

            if (startElement[0] != -1 && startElement[1] != -1) {
                possiblePositions = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
                var neighbours = (allowDiagonal == false) ? 4 : 8;
                for (var x = 0; x < neighbours; ++x) {
                    if (startElement[0] + possiblePositions[x][0] < rows && startElement[1] + possiblePositions[x][1] < cols &&
                        startElement[0] + possiblePositions[x][0] >= 0 && startElement[1] + possiblePositions[x][1] >= 0 &&
                        ['.', 'E'].includes(gridMatrix[startElement[0] + possiblePositions[x][0]][startElement[1] + possiblePositions[x][1]])) {
                        if (visited[startElement[0] + possiblePositions[x][0]][startElement[1] + possiblePositions[x][1]] == 0) {
                            currentVerticesExplored.push([startElement[0] + possiblePositions[x][0], startElement[1] + possiblePositions[x][1]]);
                            startQueue.push([startElement[0] + possiblePositions[x][0], startElement[1] + possiblePositions[x][1]]);
                            path[startElement[0] + possiblePositions[x][0]][startElement[1] + possiblePositions[x][1]] = startElement;
                            visited[startElement[0] + possiblePositions[x][0]][startElement[1] + possiblePositions[x][1]] = 1;
                        }
                        else if (visited[startElement[0] + possiblePositions[x][0]][startElement[1] + possiblePositions[x][1]] == 2) {
                            matchNode1 = startElement;
                            matchNode2 = [startElement[0] + possiblePositions[x][0], startElement[1] + possiblePositions[x][1]];
                            break;
                        }
                    }
                }
            }

            if (matchNode1[0] == -1 && matchNode1[0] == -1 && endElement[0] != -1 && endElement[1] != -1) {
                for (var x = 0; x < neighbours; ++x) {
                    if (endElement[0] + possiblePositions[x][0] < rows && endElement[1] + possiblePositions[x][1] < cols &&
                        endElement[0] + possiblePositions[x][0] >= 0 && endElement[1] + possiblePositions[x][1] >= 0 &&
                        ['.', 'E'].includes(gridMatrix[endElement[0] + possiblePositions[x][0]][endElement[1] + possiblePositions[x][1]])) {
                        if (visited[endElement[0] + possiblePositions[x][0]][endElement[1] + possiblePositions[x][1]] == 0) {
                            currentVerticesExplored.push([endElement[0] + possiblePositions[x][0], endElement[1] + possiblePositions[x][1]]);
                            endQueue.push([endElement[0] + possiblePositions[x][0], endElement[1] + possiblePositions[x][1]]);
                            path[endElement[0] + possiblePositions[x][0]][endElement[1] + possiblePositions[x][1]] = endElement;
                            visited[endElement[0] + possiblePositions[x][0]][endElement[1] + possiblePositions[x][1]] = 2;
                        }
                        else if (visited[endElement[0] + possiblePositions[x][0]][endElement[1] + possiblePositions[x][1]] == 1) {
                            matchNode1 = [endElement[0] + possiblePositions[x][0], endElement[1] + possiblePositions[x][1]];
                            matchNode2 = endElement;
                            break;
                        }
                    }
                }
            }
            verticesExplored.push(currentVerticesExplored);
            if (matchNode1[0] != -1 && matchNode1[1] != -1) {
                break;
            }
        }
        pathVertices = new Array();
        if (matchNode1[0] == -1 && matchNode1[0] == -1) {
            return [verticesExplored, []];
        }
        frontPart = new Array();
        backPart = new Array();
        while (matchNode1 != startPos) {
            frontPart.push(matchNode1);
            matchNode1 = path[matchNode1[0]][matchNode1[1]];
        }
        while (matchNode2 != endPos) {
            backPart.push(matchNode2);
            matchNode2 = path[matchNode2[0]][matchNode2[1]];
        }
        while (frontPart.length != 0) {
            element = frontPart.shift();
            backPart.unshift(element);
        }
        pathVertices = backPart;
        pathVertices.push(endPos);
        pathVertices.unshift(startPos);
        return [verticesExplored, pathVertices];
    }
}