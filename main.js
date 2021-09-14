const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  var boardResolution = canvas.width;

var robotWidth = [90,79,69,59,49,39,29];
var robotHeight = 40;
var givenRotation = 20;
var sqrDistFromCenter = 320+robotHeight;
var sqrCentersX = [];
var sqrCentersY = [];
ctx.beginPath();
ctx.rect(270,270,300,300);
ctx.fillStyle = "#4e5f6e";
ctx.fill();
ctx.closePath();


for(var sqrOnY = 0; sqrOnY<=5;sqrOnY++){
sqrDistFromCenter-=robotHeight;
for(var sqrOn = 0; sqrOn<=23;sqrOn++){
    givenRotation-=15;
    var givenCenterX = (boardResolution / 2) + sqrDistFromCenter * Math.cos((givenRotation+90) * Math.PI / 180);
    var givenCenterY = (boardResolution / 2) + sqrDistFromCenter * Math.sin((givenRotation+90) * Math.PI / 180);
    var sqrID = (((sqrOnY*24))+sqrOn);
    sqrCentersX[sqrID] = givenCenterX;
    sqrCentersY[sqrID] = givenCenterY;
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    var xVals = []
    var yVals = []

    //(givenCenterX + ((robotWidth / 2) * Math.cos(givenRotation*3.14/180)) -
    //  ((robotHeight / 2) * Math.sin(givenRotation*3.14/180)))

    xVals.push(givenCenterX + (((robotWidth[sqrOnY]) / 2) * Math.cos(givenRotation * 3.14 / 180)) - ((robotHeight / 2) * Math.sin(givenRotation * 3.14 / 180)))
    yVals.push(givenCenterY + (((robotWidth[sqrOnY]) / 2) * Math.sin(givenRotation * 3.14 / 180)) + ((robotHeight / 2) * Math.cos(givenRotation * 3.14 / 180)))

    xVals.push(givenCenterX - (((robotWidth[sqrOnY]) / 2) * Math.cos(givenRotation * 3.14 / 180)) - ((robotHeight / 2) * Math.sin(givenRotation * 3.14 / 180)))
    yVals.push(givenCenterY - (((robotWidth[sqrOnY]) / 2) * Math.sin(givenRotation * 3.14 / 180)) + ((robotHeight / 2) * Math.cos(givenRotation * 3.14 / 180)))

    xVals.push(givenCenterX - (((robotWidth[sqrOnY+1]) / 2) * Math.cos(givenRotation * 3.14 / 180)) + ((robotHeight / 2) * Math.sin(givenRotation * 3.14 / 180)))
    yVals.push(givenCenterY - (((robotWidth[sqrOnY+1]) / 2) * Math.sin(givenRotation * 3.14 / 180)) - ((robotHeight / 2) * Math.cos(givenRotation * 3.14 / 180)))

    xVals.push(givenCenterX + (((robotWidth[sqrOnY+1]) / 2) * Math.cos(givenRotation * 3.14 / 180)) + ((robotHeight / 2) * Math.sin(givenRotation * 3.14 / 180)))
    yVals.push(givenCenterY + (((robotWidth[sqrOnY+1]) / 2) * Math.sin(givenRotation * 3.14 / 180)) - ((robotHeight / 2) * Math.cos(givenRotation * 3.14 / 180)))


    ctx.beginPath();
    ctx.moveTo(xVals[0], yVals[0]);
    ctx.lineTo(xVals[1], yVals[1]);
    ctx.lineTo(xVals[2], yVals[2]);
    ctx.lineTo(xVals[3], yVals[3]);
    ctx.closePath();
    ctx.fillStyle = "#d5E1E5";
    if((sqrOn+sqrOnY) % 2 == 0){
        ctx.fillStyle = "#779AAF";
    }
    ctx.fill();
    ctx.fillStyle = "#000000";

    ctx.fillText(sqrID,givenCenterX,givenCenterY);

}}
//},32);
