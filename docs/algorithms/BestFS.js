function BestFS(gridMatrix, startPos, endPos, heuristicType, allowDiagonal, biDirectional) {
    let heuristic = null;
    if (heuristicType == "manhattan") {
        heuristic = manhattanHeuristic;
    } else if (heuristicType == "euclidean") {
        heuristic = euclideanHeuristic;
    } else if (heuristicType == "chebyshev") {
        heuristic = chebyshevHeuristic;
    } else if (heuristicType == "octile") {
        heuristic = octileHeuristic;
    }
    return genericAStar(gridMatrix, startPos, endPos, heuristic, 100000, allowDiagonal, biDirectional);
}

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
