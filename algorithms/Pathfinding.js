function startsearch(event){
    console.log(event);
    var algo= document.querySelector('input[name="algo"]:checked').value;
    //var algo=$('#algorithms').attr('id');
    switch (algo){
        case 'IDA':
           // allowdiagonal=typeof
           console.log(idastar(matrix,startPos,endPos,true,false,10000));

    }
}