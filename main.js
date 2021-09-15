const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const canvas2 = document.getElementById("myCanvas2");
    const ctx2 = canvas2.getContext("2d");
var draggedPiece = -1;
  var boardResolution = canvas.width;

  var boardSquares = [];
  for(i = 0; i<=143;i++){
    boardSquares.push(0);
  }
  boardSquares[0] = 4;  boardSquares[7] = 4;
  boardSquares[8] = 10;  boardSquares[15] = 10;

  boardSquares[1] = 3;  boardSquares[6] = 3;
  boardSquares[9] = 9;  boardSquares[14] = 9;

  boardSquares[2] = 2;  boardSquares[5] = 2;
  boardSquares[10] = 8;  boardSquares[13] = 8;

  boardSquares[3] = 6; boardSquares[4] = 5;
  boardSquares[11] = 12; boardSquares[12] = 11;

  for(pwnPsh = 24; pwnPsh<=24+7;pwnPsh++){
    boardSquares[pwnPsh] = 1;
    boardSquares[pwnPsh+8]=7;

    boardSquares[pwnPsh-24+16] = 17;
    boardSquares[pwnPsh+16] = 17;

  }

  var pieces = new Array();
  pieces[0] = new Image();
  for (let i = 1; i <= 12; i++) {
      pieces[i] = new Image();
  pieces[i].src = 'resources/'+i+'.png';
  }
  pieces[13] = new Image();
  pieces[14] = new Image();
  pieces[15] = new Image();
  pieces[16] = new Image();
  pieces[17] = new Image();

  pieces[0].src = 'resources/troll.png';
  pieces[13].src = 'resources/legalMoveDot.png';
  pieces[14].src = 'resources/redDot.png';
  pieces[15].src = 'resources/sword.png';
  pieces[16].src = 'resources/sword_b.png';
  pieces[17].src = 'resources/troll.png';

pieces[12].onload = function(){drawBackground(); renderStills();}
pieces[17].onload = function(){drawBackground(); renderStills();}

var robotWidth = [90+7,79+7,69+7,59+7,49+7,39+7,29+7];
var robotHeight = 40;
var boardRotation = 70;
var sqrCentersX = [];
var sqrCentersY = [];


function drawBackground(){
var givenRotation = boardRotation;

  var sqrDistFromCenter = 350+robotHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();

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
    if((sqrOn+sqrOnY) % 2 != 0){
        ctx.fillStyle = "#779AAF";
    }
    ctx.fill();
    ctx.fillStyle = "#000000";

  //  ctx.fillText(sqrID,givenCenterX,givenCenterY);

}}
}
var pieceSize = boardResolution/18;
function renderStills(){
  for(var pieceOn = 0; pieceOn<sqrCentersX.length;pieceOn++){

    if(boardSquares[pieceOn]>0&&draggedPiece!=pieceOn){
      ctx.drawImage(pieces[boardSquares[pieceOn]],sqrCentersX[pieceOn]-(pieceSize/2),sqrCentersY[pieceOn]-(pieceSize/2),pieceSize,pieceSize);
    }
}

}

// animationTimer = window.setInterval(function(){
// ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
// drawBackground();
// renderStills();
// boardRotation+=1;
//
// },32);
