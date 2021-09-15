const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const canvas2 = document.getElementById("myCanvas2");
    const ctx2 = canvas2.getContext("2d");

  var boardResolution = canvas.width;

var robotWidth = [90+7,79+7,69+7,59+7,49+7,39+7,29+7];
var robotHeight = 40;
var givenRotation = 20;
var sqrDistFromCenter = 350+robotHeight;
var sqrCentersX = [];
var sqrCentersY = [];
ctx.beginPath();
ctx.rect(250,250,300,300);
ctx.fillStyle = "#4e5f6e";
ctx.fill();
ctx.closePath();

ctx2.beginPath();
ctx2.rect(0,0,96,768);
ctx2.fillStyle = "#9fb7c6";
ctx2.fill();
ctx2.closePath();


for(var sqrOnY = 0; sqrOnY<=5;sqrOnY++){
sqrDistFromCenter-=robotHeight;
for(var sqrOn = 0; sqrOn<=23;sqrOn++){
    givenRotation-=15;
    var givenCenterX = (boardResolution / 2) + sqrDistFromCenter * Math.cos((givenRotation+90) * Math.PI / 180);
    var givenCenterY = (boardResolution / 2) + sqrDistFromCenter * Math.sin((givenRotation+90) * Math.PI / 180);
    var sqrID = (((sqrOnY*24))+sqrOn);
    sqrCentersX[sqrID] = Math.floor(givenCenterX);
    sqrCentersY[sqrID] = Math.floor(givenCenterY);
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
