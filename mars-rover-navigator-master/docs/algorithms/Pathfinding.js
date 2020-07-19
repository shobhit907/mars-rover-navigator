function startsearch(event) {
    console.log(event);
    let algo = document.querySelector('input[name="algo"]:checked').value;
    console.log(algo);
    switch (algo) {
        case 'IDA':
            // allowdiagonal=typeof
            heuristic = document.querySelector('input[name="IDA-star-heuristic"]:checked').value;
           // heuristic ="chebyshev";
            allowDiagonal = document.getElementById("IDA-diag").checked;
            showrecursion = document.getElementById("IDA-rec").checked;
            weight = document.getElementById("weight-ida").value;
            weight = parseFloat(weight);
            timelim = document.getElementById("time").value;
            timelim = parseFloat(timelim);
          //  console.log(startPos, endPos, allowDiagonal, bidirectional, timelim,heuristic);
            out = idastar(matrix, startPos, endPos, heuristic, allowDiagonal, showrecursion, timelim,weight);
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
