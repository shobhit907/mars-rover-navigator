function generate_maze(grid, xl, yl, xr, yr) {
    for(x=xl;x<=xr;x++){
        for(y=yl;y<=yr;y++){
            ran=Math.floor(Math.random()*100);
            if(ran<30){
                grid[x][y]='#';
            }
        }
    }
    return;
    dx = xr - xl;
    dy = yr - yl;
    if (dx <= 2 || dy <= 2) {
        return;
    }
    ran = Math.floor(Math.random() * 2);
    if(dx>=dy){
        ran=0;
    }else{
        ran=1;
    }
    if (ran == 0) {
        // Make horizontal wall
        console.log("Hor");
        x=Math.floor(Math.random()*(xr-xl+1))+xl;
        emptySpace=Math.floor(Math.random()*(yr-yl+1))+yl;
        for(let y=yl;y<=yr;y++){
            if(y==emptySpace){
                grid[x][y]='.';
            }else{
                grid[x][y]='#';
            }
        }
        generate_maze(grid,xl+1,yl+1,x-2,yr-1);
        generate_maze(grid,x+2,yl+1,xr-1,yr-1);

    } else if (ran == 1) {
        // Make vertical wall
        console.log("Vert");
        y=Math.floor(Math.random()*(yr-yl+1))+yl;
        emptySpace=Math.floor(Math.random()*(xr-xl+1))+xl;
        for(let x=xl;x<=xr;x++){
            if(x==emptySpace){
                grid[x][y]='.';
            }else{
                grid[x][y]='#';
            }
        }
        generate_maze(grid,xl+1,yl+1,xr-1,y-2);
        generate_maze(grid,xl+1,y+2,xr-1,yr-1);
    }
}