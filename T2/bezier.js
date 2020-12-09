// Curvas de Bezier
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var pickedPoints = [{x:0,y:0}];

document.getElementById("canvas").addEventListener("mouseup",onMouseUp);
document.getElementById("canvas").addEventListener("mousemove",onMouseMove);
document.getElementById("canvas").addEventListener("mousedown",onMouseDown);

var pointCount = 0;
var isDraggingP0 = false;
var isDraggingP1 = false;
var isDraggingP2 = false;
var isDraggingP3 = false;

function getMousePos(evt)
{
	let rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function onMouseMove(evt)
{
    let point = getMousePos(evt);

    if(pointCount < 4){
	    pickedPoints[pickedPoints.length-1] = point;
        redraw();
    }

    if(isDraggingP0){
    //    console.log("x:" + pickedPoints[0].x + "y:" + pickedPoints[0].y );
        pickedPoints[0] = point;
        redraw();
    }
    else if(isDraggingP1){
        pickedPoints[1] = point;
        redraw();
    }
    else if(isDraggingP2){
        pickedPoints[2] = point;
        redraw();
    }
    else if(isDraggingP3){
        pickedPoints[3] = point;
        redraw();
    }
}

function onMouseUp(evt)
{
    isDraggingP0 = false;
    isDraggingP1 = false;
    isDraggingP2 = false;
    isDraggingP3 = false;
    pointCount++;
    let point = getMousePos(evt);
 
    if(pointCount < 4){
        pickedPoints.push(point);
        redraw();
    }
    redraw();
}

function onMouseDown(evt){
    let point = getMousePos(evt);

    if(pointCount>=4){

        if( Math.abs(point.x - pickedPoints[0].x) <= 5 && Math.abs(point.y - pickedPoints[0].y) <= 5 ){
            isDraggingP0 = true;
        }
        if( Math.abs(point.x - pickedPoints[1].x) <= 5 && Math.abs(point.y - pickedPoints[1].y) <= 5 ){
            isDraggingP1 = true;
        }
        if( Math.abs(point.x - pickedPoints[2].x) <= 5 && Math.abs(point.y - pickedPoints[2].y) <= 5 ){
            isDraggingP2 = true;
        }
        if( Math.abs(point.x - pickedPoints[3].x) <= 5 && Math.abs(point.y - pickedPoints[3].y) <= 5 ){
            isDraggingP3 = true;
        }
    }
}

function redraw()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.strokeStyle = "green";//"#FF0000";
	ctx.lineWidth = 3;
	ctx.lineJoin = "round";
	ctx.beginPath();
	for(let i = 0; i < pickedPoints.length; ++i)
	{
		ctx.lineTo(pickedPoints[i].x,pickedPoints[i].y);
	}
	ctx.stroke();

	ctx.fillStyle = "#0000FF";
	for(let i = 0; i < pickedPoints.length; ++i)
	{
		ctx.beginPath();
		ctx.arc(pickedPoints[i].x,pickedPoints[i].y, 5, 0, 2*Math.PI, true);
        ctx.fill();
    }
    
    if(pointCount > 3){
        bezierCurve();
    }
}

function bezierCurve(){
    //P = (1−t)^3*P0 + 3*(1−t)^2*t*P1 +3*(1−t)*t^2*P2 + t^3*P3
    var bezierPointsX = [];
    var bezierPointsY = [];
    var btx = canvas.getContext("2d");
    btx.strokeStyle = "red";
    btx.lineWidth = 3;
    btx.lineJoin = "round";

    for(let t = 0.0; t <= 1.0; t+=0.001){
        let x = (1-t)*(1-t)*(1-t)*pickedPoints[0].x + 3*(1-t)*(1-t)*t*pickedPoints[1].x + 3*(1-t)*t*t*pickedPoints[2].x + t*t*t*pickedPoints[3].x;
        let y = (1-t)*(1-t)*(1-t)*pickedPoints[0].y + 3*(1-t)*(1-t)*t*pickedPoints[1].y + 3*(1-t)*t*t*pickedPoints[2].y + t*t*t*pickedPoints[3].y;
        bezierPointsX.push(x);
        bezierPointsY.push(y);
    }

    
    for(let i = 0; i < bezierPointsX.length-1; i++){
        btx.beginPath();
        btx.moveTo(bezierPointsX[i],bezierPointsY[i]);
        btx.lineTo(bezierPointsX[i+1],bezierPointsY[i+1]);
        btx.stroke();
    }

}