function startsearch(event) {
    console.log(event);
    let algo = document.querySelector('input[name="algo"]:checked').value;
    console.log(algo);
    switch (algo) {
        case 'IDA':
            // allowdiagonal=typeof
            out = idastar(matrix, startPos, endPos, false, false, 10000);
            plotPathAndVertices(out);
            break;
        case "A-star":
            heuristic = document.querySelector('input[name="A-star-heuristic"]:checked').value;
            allowDiagonal = document.getElementById("A-diag").checked;
            bidirectional = document.getElementById("A-bi").checked;
            weight = document.getElementById("weight").value;
            weight = parseFloat(weight);
            out = AStar(matrix, startPos, endPos, heuristic, weight, allowDiagonal, bidirectional);
            plotPathAndVertices(out);
            break;
        case "BreadthFS":
            allowDiagonal = document.getElementById("bfs-diag").checked;
            bidirectional = document.getElementById("bfs-bi").checked;
            out = breadthFS(matrix, startPos, endPos, allowDiagonal, bidirectional);
            plotPathAndVertices(out);
            break;
        default:
            console.log("Select one algo");
    }
}
