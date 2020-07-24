jQuery(document).ready(function () {
	grid = document.getElementById("grid");
	grid.width=2000;
	grid.height=1000;
	grid.style.width="2100px";
	grid.style.height="1050px";
	// grid.width=grid.clientWidth;
	// grid.height=grid.clientHeight;

	ctx = grid.getContext("2d");	
	ctx.scale(2.857,2.857);

	ctx.lineWidth = 0.5;
	ctx.strokeStyle = "black";
	ctx.translate(0.5, 0.5);
	console.log(rows,cols);
	for (x = 0; x < rows; x++) {
		for (y = 0; y < cols; y++) {
			ctx.strokeRect(x * sz, y * sz, sz, sz);
		}
	}


	img = new Image();
	img.onload = function () {
		grid.addEventListener("dragstart", function (e) {

			e.dataTransfer.setDragImage(img, -2000, 2000);

		}, false);

	}
	img.src = "http://placehold.it/75/ffffff/ffffff?text=f";
	img.setAttribute('width', '10px');
	img.setAttribute('height', '10px');
});

function getXY(pixelx, pixely) {
	grid = document.getElementById("grid");
	grid_area = document.getElementById("grid-area");
	// divide_by = sz * grid_area.offsetHeight / grid.height;
	// divide_by=sz*1500/grid.width*4;
	divide_by=sz*2100/grid.width*2.857;
	pixely+=scrollY;
	pixelx+=scrollX;
	X = pixelx / divide_by;
	Y = pixely / divide_by;
	X = ~~X;
	Y = ~~Y;
	// console.log("pixelx = ",pixelx," pixely = ",pixely," X = ",X," Y = ",Y);
	return [X, Y];
}

function markStartEnd(event) {
	// console.log(event);
	let checked = document.querySelector('input[name="blocktype"]:checked').value;
	if (!(checked == "start" || checked == "end")) {
		return;
	}
	let x = event.clientX, y = event.clientY;
	coord = getXY(x, y);
	x = coord[0];
	y = coord[1];
	// console.log(x,y);
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	if (checked == "start") {
		if (startPos[0] != -1) {
			matrix[startPos[0]][startPos[1]] = '.';
			ctx.clearRect(startPos[0] * sz, startPos[1] * sz, sz, sz);
			ctx.strokeRect(startPos[0] * sz, startPos[1] * sz, sz, sz);
		}
		startPos = [x, y];
		matrix[x][y] = 'S';
		ctx.fillStyle = startColor;
		ctx.fillRect(x * sz, y * sz, sz, sz);
	} else if (checked === "end") {
		if (endPos[0] != -1) {
			matrix[endPos[0]][endPos[1]] = '.';
			ctx.clearRect(endPos[0] * sz, endPos[1] * sz, sz, sz);
			ctx.strokeRect(endPos[0] * sz, endPos[1] * sz, sz, sz);
		}
		endPos = [x, y];
		matrix[x][y] = 'E';
		ctx.fillStyle = endColor;
		ctx.fillRect(x * sz, y * sz, sz, sz);
	}
}


function markWall(event) {
	var checked = document.querySelector('input[name="blocktype"]:checked').value;
	if (!(checked == "wall1" || checked == "wall2")) {
		return;
	}
	let x = event.clientX, y = event.clientY;
	coord = getXY(x, y);
	x = coord[0];
	y = coord[1];
	if (x === 0 && y === 0) {
		return;
	}
	if (matrix[x][y] == 'S' || matrix[x][y] == 'E') {
		return;
	}
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	if(event.type=="mousedown" && (matrix[x][y]=='*' || matrix[x][y]=='#')){
		matrix[x][y]='.';
		ctx.clearRect(x*sz,y*sz,sz,sz);
		ctx.strokeStyle="black";
		ctx.strokeRect(x*sz,y*sz,sz,sz);
		return;
	}
	if (checked == "wall1") {
		matrix[x][y] = '#';
		ctx.fillStyle = impassableWallColor;
		ctx.fillRect(x * sz, y * sz, sz, sz);
	} else if (checked == "wall2") {
		matrix[x][y] = '*';
		// ctx.fillStyle="red";
		// ctx.fillText("10",x*sz,(y+1)*sz,sz-2);
		ctx.fillStyle = passableWallColor;
		ctx.fillRect(x * sz, y * sz, sz, sz);
	}
}

function resetGrid(event) {
	document.getElementById("search-time").innerHTML=0;
	document.getElementById('path-length').innerHTML=0;
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	ctx.strokeStyle = "black";
	ctx.clearRect(0, 0, grid.width, grid.height);
	for (x = 0; x < rows; x++) {
		for (y = 0; y < cols; y++) {
			ctx.strokeRect(x * sz, y * sz, sz, sz);
			matrix[x][y]='.';
		}
	}
}

function clearPath(event){
	document.getElementById("search-time").innerHTML=0;
	document.getElementById('path-length').innerHTML=0;
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	ctx.strokeStyle = "black";
	ctx.clearRect(0, 0, grid.width, grid.height);
	for (x = 0; x < rows; x++) {
		for (y = 0; y < cols; y++) {
			ctx.strokeRect(x * sz, y * sz, sz, sz);
			if(matrix[x][y]=='.'){
				continue;
			}
			if(matrix[x][y]=='S'){
				ctx.fillStyle=startColor;
			}else if(matrix[x][y]=='E'){
				ctx.fillStyle=endColor;
			}else if(matrix[x][y]=='#'){
				ctx.fillStyle=impassableWallColor;
			}else if(matrix[x][y]=='*'){
				ctx.fillStyle=passableWallColor;
			}
			ctx.fillRect(x*sz,y*sz,sz,sz);
		}
	}
}

// function toggleWall(event){
// 	var checked = document.querySelector('input[name="blocktype"]:checked').value;
// 	if (!(checked == "wall1" || checked == "wall2")) {
// 		return;
// 	}
// 	let x = event.clientX, y = event.clientY;
// 	coord = getXY(x, y);
// 	x = coord[0];
// 	y = coord[1];
// 	if (x === 0 && y === 0) {
// 		return;
// 	}
// 	if (matrix[x][y] == 'S' || matrix[x][y] == 'E') {
// 		return;
// 	}
// 	grid = document.getElementById("grid");
// 	ctx = grid.getContext("2d");
// 	if(matrix[x][y]=='*' || matrix[x][y]=='#'){
// 		matrix[x][y]='.';
// 		ctx.clearRect(x*sz,y*sz,sz,sz);
// 		ctx.strokeStyle="black";
// 		ctx.strokeRect(x*sz,y*sz,sz,sz);
// 		return;
// 	}
// 	if (checked == "wall1") {
// 		matrix[x][y] = '#';
// 		ctx.fillStyle = impassableWallColor;
// 		ctx.fillRect(x * sz, y * sz, sz, sz);
// 	} else if (checked == "wall2") {
// 		matrix[x][y] = '*';
// 		// ctx.fillStyle="red";
// 		// ctx.fillText("10",x*sz,(y+1)*sz,sz-2);
// 		ctx.fillStyle = passableWallColor;
// 		ctx.fillRect(x * sz, y * sz, sz, sz);
// 	}
// }