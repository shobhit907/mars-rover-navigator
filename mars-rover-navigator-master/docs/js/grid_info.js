/*
Grid is represented by matrix[rows][cols]. Each entry is character
matrix[x][y]='.'    =>Empty
matrix[x][y]='S'    =>Start
matrix[x][y]='E'    =>End
matrix[x][y]='#'    =>Impassable Wall
matrix[x][y]='*'    =>Passable Walls
*/
var startPos = [-1, -1], endPos = [-1, -1];
var costPassableWall = 5;
var sz = 8;
var rows = 50, cols = 50;
var startColor = "#65DE17";
var endColor = "#EE4523";
var impassableWallColor = "black";
var passableWallColor = "#808080";
var matrix = new Array(rows);
for (x = 0; x < rows; x++) {
    matrix[x] = new Array(cols);
    for (y = 0; y < cols; y++) {
        matrix[x][y] = '.';
    }
}
jQuery(document).ready(function () {
    // console.log(matrix);
}
);