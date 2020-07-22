
function genericAStar(gridMatrix, startPos, endPos, heuristic, weight, allowDiagonal, biDirectional) {
    startPos = startPos || [-1, -1];
    endPos = endPos || [-1, -1];
    heuristic = heuristic || defaultHeuristic;
    if (weight == null) {
        weight = 1;
    }
    allowDiagonal = allowDiagonal || false;
    biDirectional = biDirectional || false;
    if (startPos[0] == -1 || startPos[1] == -1 || endPos[0] == -1 || endPos[1] == -1) {
        return [];
    }
    let delta = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    if (biDirectional == false) {
        let cells_info = new Array(rows);
        for (let x = 0; x < rows; x++) {
            cells_info[x] = new Array(cols);
            for (let y = 0; y < cols; y++) {
                cells_info[x][y] = [Infinity, null, Infinity, [-2, -2]];
            }
        }
        //Each cells_info cell will contain [g,h,f,parent]

        cells_info[startPos[0]][startPos[1]] = [0, null, 0, [-1, -1]];
        let heap = new Heap(heapCmp);
        heap.push([startPos, 0, 0]);  //[pos,g,f]
        let vertices_explored = new Array();
        while (!heap.empty()) {
            let topNode = heap.pop();
            if (topNode[0][0] == endPos[0] && topNode[0][1] == endPos[1]) {
                // console.log("Reached end location");
                break;
            }
            let current_vertices_explored = new Array();
            let upto = (allowDiagonal ? 7 : 3);
            for (let idx = 0; idx <= upto; idx++) {
                let newPos = [topNode[0][0] + delta[idx][0], topNode[0][1] + delta[idx][1]];
                // console.log(newPos);
                if (newPos[0] >= 0 && newPos[0] < rows && newPos[1] >= 0 && newPos[1] < cols && gridMatrix[newPos[0]][newPos[1]] != '#') {
                    newg = topNode[1];
                    if (gridMatrix[newPos[0]][newPos[1]] == '*') {
                        newg += costPassableWall;
                    } else {
                        newg += 1;
                    }
                    if (newg < cells_info[newPos[0]][newPos[1]][0]) {
                        current_vertices_explored.push(newPos);
                        newh = weight * heuristic(newPos, endPos);
                        newf = newg + newh;
                        cells_info[newPos[0]][newPos[1]] = [newg, newh, newf, topNode[0]];
                        heap.push([newPos, newg, newf]);
                    }
                }
            }
            if (cells_info[endPos[0]][endPos[1]][3][0] != -2) {
                break;
            }
            vertices_explored.push(current_vertices_explored);
        }
        if (cells_info[endPos[0]][endPos[1]][3][0] == -2) {
            return [vertices_explored, []];
        } else {
            path = getPathByBacktrack(cells_info, startPos, endPos);
            // console.log(path);
            return [vertices_explored, path];
        }
    } else {
        let fromStart = 1, fromEnd = 2;
        let cells_info = new Array(rows);
        for (let x = 0; x < rows; x++) {
            cells_info[x] = new Array(cols);
            for (let y = 0; y < cols; y++) {
                cells_info[x][y] = [Infinity, null, Infinity, [-2, -2], 0];
            }
        }
        //Each cells_info cell will contain [g,h,f,parent,visited from(start or end)(0 means not visited)]

        let startHeap = new Heap(heapCmp);
        let endHeap = new Heap(heapCmp);
        cells_info[startPos[0]][startPos[1]] = [0, null, 0, [-1, -1], fromStart];
        cells_info[endPos[0]][endPos[1]] = [0, null, 0, [-1, -1], endPos];
        startHeap.push([startPos, 0, 0]);
        endHeap.push([endPos, 0, 0]);
        let matchStart = [-1, -1], matchEnd = [-1, -1];

        let vertices_explored = new Array();
        while (!startHeap.empty() || !endHeap.empty()) {
            let current_vertices_explored = new Array();
            let upto = (allowDiagonal ? 7 : 3);
            if (!startHeap.empty()) {
                let nodeStart = startHeap.pop();
                for (let idx = 0; idx <= upto; idx++) {
                    let newPos = [nodeStart[0][0] + delta[idx][0], nodeStart[0][1] + delta[idx][1]];
                    // console.log(newPos);
                    if (newPos[0] >= 0 && newPos[0] < rows && newPos[1] >= 0 && newPos[1] < cols && gridMatrix[newPos[0]][newPos[1]] != '#') {
                        if (cells_info[newPos[0]][newPos[1]][4] == fromEnd) {
                            matchStart = nodeStart[0];
                            matchEnd = newPos;
                            break;
                        }
                        newg = nodeStart[1];
                        if (gridMatrix[newPos[0]][newPos[1]] == '*') {
                            newg += costPassableWall;
                        } else {
                            newg += 1;
                        }
                        if (newg < cells_info[newPos[0]][newPos[1]][0]) {
                            current_vertices_explored.push(newPos);
                            newh = weight * heuristic(newPos, endPos);
                            newf = newg + newh;
                            cells_info[newPos[0]][newPos[1]] = [newg, newh, newf, nodeStart[0], fromStart];
                            startHeap.push([newPos, newg, newf]);
                        }
                    }
                }
                vertices_explored.push(current_vertices_explored);
                if (matchStart[0] != -1) {
                    break;
                }
            }

            if (!endHeap.empty()) {
                let nodeEnd = endHeap.pop();
                current_vertices_explored = new Array();
                for (let idx = 0; idx <= upto; idx++) {
                    let newPos = [nodeEnd[0][0] + delta[idx][0], nodeEnd[0][1] + delta[idx][1]];
                    // console.log(newPos);
                    if (newPos[0] >= 0 && newPos[0] < rows && newPos[1] >= 0 && newPos[1] < cols && gridMatrix[newPos[0]][newPos[1]] != '#') {
                        if (cells_info[newPos[0]][newPos[1]][4] == fromStart) {
                            matchStart = newPos;
                            matchEnd = nodeEnd[0];
                            break;
                        }
                        newg = nodeEnd[1];
                        if (gridMatrix[newPos[0]][newPos[1]] == '*') {
                            newg += costPassableWall;
                        } else {
                            newg += 1;
                        }
                        if (newg < cells_info[newPos[0]][newPos[1]][0]) {
                            current_vertices_explored.push(newPos);
                            newh = weight * heuristic(newPos, startPos);
                            newf = newg + newh;
                            cells_info[newPos[0]][newPos[1]] = [newg, newh, newf, nodeEnd[0], fromEnd];
                            endHeap.push([newPos, newg, newf]);
                        }
                    }
                }
                vertices_explored.push(current_vertices_explored);
                if (matchStart[0] != -1) {
                    break;
                }
            }
        }
        if (cells_info[endPos[0]][endPos[1]][4] == 0) {
            return [vertices_explored, []];
        } else {
            let path1 = getPathByBacktrack(cells_info, startPos, matchStart);
            let path2 = getPathByBacktrack(cells_info, endPos, matchEnd);
            path2.reverse();
            // console.log(path1);
            // console.log(path2);
            let path = path1;
            path = path.concat(path2);
            // console.log(path);
            return [vertices_explored, path];
        }

    }


}

function defaultHeuristic(pos1, pos2) {
    return Math.floor(Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]));
}

function heapCmp(heapPos1, heapPos2) {
    return heapPos1[2] - heapPos2[2];
}

function getPathByBacktrack(cells_info, startPos, endPos) {
    let currPos = endPos;
    let path = new Array();
    while (currPos[0] != -1 && currPos[1] != -1) {
        path.push(currPos);
        currPos = cells_info[currPos[0]][currPos[1]][3];
    }
    path.reverse();
    return path;
}



