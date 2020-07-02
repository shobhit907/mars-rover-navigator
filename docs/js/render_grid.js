var sz=8;

jQuery(document).ready(function () {
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	ctx.lineWidth = 1;
	ctx.translate(0.5, 0.5);
	for (x = 0; x < 30; x++) {
		ctx.beginPath();
		ctx.moveTo(0, x * sz);
		ctx.lineTo(grid.width, x * sz);
		ctx.stroke();
	}
	for (x = 0; x < 30; x++) {
		ctx.beginPath();
		ctx.moveTo(x * sz, 0);
		ctx.lineTo(x * sz, grid.height);
		ctx.stroke();
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

function markStartEnd(event) {
//	console.log(event);
	var checked = document.querySelector('input[name="blocktype"]:checked').value;
	if(!(checked=="start" || checked=="end")){
		return;
	}
	var x=event.clientX,y=event.clientY;
	x-=30;
	x/=40;
	y/=40;
	x=~~x;
	y=~~y;
//	console.log(x,y);
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	if (checked == "start") {
		ctx.fillStyle = "green";
		ctx.fillRect(x*sz,y*sz,sz,sz);
	} else if (checked === "end") {
		ctx.fillStyle = "red";
		ctx.fillRect(x*sz,y*sz,sz,sz);
	}
}

function markWall(event){
	var checked = document.querySelector('input[name="blocktype"]:checked').value;
	if(!(checked=="wall1" || checked=="wall2")){
		return;
	}
	var x=event.clientX,y=event.clientY;
	x-=30;
	x/=40;
	y/=40;
	x=~~x;
	y=~~y;
	if(x===0 && y===0){
		return;
	}
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	if(checked=="wall1"){
		ctx.fillStyle = "black";
		ctx.fillRect(x*sz,y*sz,sz,sz);
	}else if(checked=="wall2"){
		ctx.fillStyle = "gray";
		ctx.fillRect(x*sz,y*sz,sz,sz);
	}
}

function resetGrid(event){
	grid = document.getElementById("grid");
	ctx = grid.getContext("2d");
	ctx.clearRect(0,0,grid.width,grid.height);
	for (x = 0; x < 30; x++) {
		ctx.beginPath();
		ctx.moveTo(0, x * sz);
		ctx.lineTo(grid.width, x * sz);
		ctx.stroke();
	}
	for (x = 0; x < 30; x++) {
		ctx.beginPath();
		ctx.moveTo(x * sz, 0);
		ctx.lineTo(x * sz, grid.height);
		ctx.stroke();
	}
}

function fun1() {
	var var2 = document.querySelector('input[name="blocktype"]:checked').value;
	//	console.log(var2);
}
