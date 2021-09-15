document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

document.addEventListener("touchmove", mouseMoveHandler, false);
document.addEventListener("touchstart", mouseDownHandler, false);
document.addEventListener("touchend", mouseUpHandler, false);

var relativeX = 0;
var relativeY = 0;
var mousedownBool = false;
var dragMult = 1.5;

function mouseMoveHandler(e) {
    var rect = canvas.getBoundingClientRect();
    if('clientX' in e){
        dragMult = 1.5;
      relativeX = e.clientX - rect.left;
      relativeY = e.clientY - rect.top;
    }
    if('touches' in e){
        dragMult = 2;
        relativeX = e.touches[0].clientX - rect.left;
        relativeY = e.touches[0].clientY - rect.top;
    }
    updateCursorIcon();
var closestSquare = getPieceAtPos(relativeX,relativeY);
if(draggedPiece!=-1){
    drawBackground()
    renderStills()
    ctx.drawImage(pieces[boardSquares[draggedPiece]],relativeX-(dragMult*pieceSize/2),relativeY-(dragMult*pieceSize/2),pieceSize*dragMult,pieceSize*dragMult);
}

  }

  function getPieceAtPos(relativeX,relativeY){
      var closestSquare = 0;
      var closestDistance = 1000;
      for(var distanceTester = 0; distanceTester<sqrCentersX.length;distanceTester++) {
          var myDist = Math.sqrt(((sqrCentersX[distanceTester] - relativeX) * (sqrCentersX[distanceTester] - relativeX)) + ((sqrCentersY[distanceTester] - relativeY) * (sqrCentersY[distanceTester] - relativeY)))
          if (myDist < closestDistance) {
              closestDistance = myDist;
              closestSquare = distanceTester;
          }
      }
      //console.log(Math.floor(closestDistance))
      if(closestDistance<50){
          return closestSquare;
      }
      return -1;
  }


function updateCursorIcon(){
    if(relativeX>=0 &&relativeX<=boardResolution&&relativeY>=0 &&relativeY<=boardResolution){
        var selection = getPieceAtPos(relativeX,relativeY);
        if(mousedownBool && draggedPiece>0){
            document.body.style.cursor = 'grabbing';
        }
        else if (boardSquares[selection]>0){
            document.body.style.cursor = 'grab';
        }else{
            document.body.style.cursor = 'default';
        }
    }
    else{document.body.style.cursor = 'default';}


}

function mouseDownHandler(e) {
    var rect = canvas.getBoundingClientRect();
    if('clientX' in e){
        relativeX = e.clientX - rect.left;
        relativeY = e.clientY - rect.top;
    }
    if('touches' in e){
        relativeX = e.touches[0].clientX - rect.left;
        relativeY = e.touches[0].clientY - rect.top;
    }

mousedownBool = true;
let closestSquare = getPieceAtPos(relativeX,relativeY);
if(closestSquare!= -1){
    if(boardSquares[closestSquare]>0){
        draggedPiece = closestSquare;
    }
}

}

function mouseUpHandler(e){

    mousedownBool = false;
    var newPos = getPieceAtPos(relativeX,relativeY)
    if(draggedPiece!=-1){
        var draggedVal = boardSquares[draggedPiece];
        var newVal = boardSquares[newPos];
        boardSquares[draggedPiece] = 0;
        boardSquares[newPos] = draggedVal;
    }

    draggedPiece = -1;
    drawBackground()
    renderStills()
}