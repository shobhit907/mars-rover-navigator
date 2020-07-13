function startsearch(event) {
    console.log(event);
    let algo = document.querySelector('input[name="algo"]:checked').value;
    console.log(algo);
    switch (algo) {
        case 'IDA':
            // allowdiagonal=typeof
            out=idastar(matrix, startPos, endPos, false, false, 10000);
            plotPathAndVertices(out);
            break;
        case "A-star":
            // console.log("Inside a-star");
            out = aStar(matrix, startPos, endPos, null, null, true);
            // console.log(out);
            plotPathAndVertices(out);
            break;
        case "BreadthFS":
            var allowDiagonal = document.getElementById("bfs-diag").checked;
            var bidirectional = document.getElementById("bfs-bi").checked;
            out = breadthFS(matrix, startPos, endPos, allowDiagonal, bidirectional);
            plotPathAndVertices(out);
            break;
        default:
            console.log("Select one algo");
    }
}
