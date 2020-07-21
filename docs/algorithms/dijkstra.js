function dijkstra(gridMatrix,startPos,endPos,allowDiagonal, biDirectional){
    return genericAStar(gridMatrix, startPos, endPos, null, 0, allowDiagonal, biDirectional);
}