function startSearch(event) {
    // console.log(event);
    let algo = document.querySelector('input[name="algo"]:checked').value;
    // console.log(algo);
    let time_taken=document.getElementById("search-time");
    let path_length = document.getElementById("path-length");
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
            startTime=(new Date()).getTime();
            out = idastar(matrix, startPos, endPos, heuristic, allowDiagonal, showrecursion, timelim, weight);
            endTime=(new Date()).getTime();
            plotPathAndVertices(out);
            time_taken.innerHTML=endTime-startTime;
            path_length.innerHTML=out[1].length;
            break;
        case "A-star":
            heuristic = document.querySelector('input[name="A-star-heuristic"]:checked').value;
            allowDiagonal = document.getElementById("A-diag").checked;
            bidirectional = document.getElementById("A-bi").checked;
            weight = document.getElementById("weight").value;
            weight = parseFloat(weight);
            startTime=(new Date()).getTime();
            out = AStar(matrix, startPos, endPos, heuristic, weight, allowDiagonal, bidirectional);
            endTime=(new Date()).getTime();
            plotPathAndVertices(out);
            path_length.innerHTML=out[1].length;
            time_taken.innerHTML=endTime-startTime;
            break;
        case "BreadthFS":
            allowDiagonal = document.getElementById("bfs-diag").checked;
            bidirectional = document.getElementById("bfs-bi").checked;
            startTime=(new Date()).getTime();
            out = breadthFS(matrix, startPos, endPos, allowDiagonal, bidirectional);
            endTime=(new Date()).getTime();
            plotPathAndVertices(out);
            path_length.innerHTML=out[1].length;
            time_taken.innerHTML=endTime-startTime;
            break;
        case "BestFS":
            heuristic = document.querySelector('input[name="BestFS-heuristic"]:checked').value;
            allowDiagonal = document.getElementById("BestFS-diag").checked;
            bidirectional = document.getElementById("BestFS-bi").checked;
            startTime=(new Date()).getTime();
            out=BestFS(matrix,startPos,endPos,heuristic,allowDiagonal,bidirectional);
            endTime=(new Date()).getTime();
            plotPathAndVertices(out);
            path_length.innerHTML=out[1].length;
            time_taken.innerHTML=endTime-startTime;
            break;
        case "Dijkstra":
            allowDiagonal = document.getElementById("dijkstra-diag").checked;
            bidirectional = document.getElementById("dijkstra-bi").checked;
            startTime=(new Date()).getTime();
            out=dijkstra(matrix,startPos,endPos,allowDiagonal,bidirectional);
            endTime=(new Date()).getTime();
            plotPathAndVertices(out);
            path_length.innerHTML=out[1].length;
            time_taken.innerHTML=endTime-startTime;
            break;
        default:
            console.log("Select one algo");
    }
}
