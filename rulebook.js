var legalMoves = [];

function updateLegalMoves(sqrSrc){
  legalMoves = [];
for (sqrItr = 0; sqrItr<boardSquares.length; sqrItr++){
  if(rulebook(sqrSrc,sqrItr,boardSquares,true)){
    legalMoves.push(true);
  }else{
    legalMoves.push(false);
  }
}


}
function getPiece(myx,myy,board){
return board[(((myy*23))+myx)];
}

function rulebook(source,destination,board,whitesMove){
  if(source==-1){
    return false;
  }
  if(destination==-1){
    return false;
  }
    var internalBoard = board;
    if(!whitesMove){internalBoard=boardSquaresReversed()}

if(!whitesMove){
    source=63-source;
   destination=63-destination;
}
    var sourceX=(source % 8);
    var sourceY = Math.floor(source/8);
    var destX=(destination % 8);
    var destY = Math.floor(destination/8);


if (internalBoard[source]==0){
    return false;
}
if(getPiece(destX,destY,internalBoard)<=6&&getPiece(destX,destY,internalBoard)!=0){return false;}//doesn't let you self-attack
if(sourceX<0||sourceY<0||sourceX>=8||sourceY>=8){return false;}
if(destX<0||destY<0||destX>=8||destY>=8){return false;}
if(sourceX==destX&&sourceY==destY){return false;}

    if(internalBoard[source]==1){//pawns
    if(sourceX==destX){
        if((sourceY==6&&destY==4) && (getPiece(sourceX,sourceY-2,internalBoard)==0)&& (getPiece(sourceX,sourceY-1,internalBoard)==0)){return true;}
        if((sourceY-1==destY) && (getPiece(sourceX,sourceY-1,internalBoard)==0)){return true;}//forward movement
    }
    if(((sourceX+1==destX && sourceY-1==destY )||(sourceX-1==destX && sourceY-1==destY))&& getPiece(destX,destY,internalBoard)>6){return true;} //attacks

    }//closing pawns

    if(internalBoard[source]==6){//king
        if(Math.abs(sourceX-destX)<=1&&Math.abs(sourceY-destY)<=1&&(getPiece(destX,destY,internalBoard)>6||getPiece(destX,destY,internalBoard)==0)){
return true;
        }
    }

    if(internalBoard[source]==2){//bishop

    if(Math.abs(sourceX-destX) != Math.abs(sourceY - destY)){return false;} //fails if not perfectly diagonal

    if(getPiece(destX,destY,internalBoard)==0 | getPiece(destX, destY,internalBoard) > 6){
        var scanDirX=0;
        var scanDirY=0;
        if (sourceX > destX){scanDirX = 0 - 1;}
        else{scanDirX = 1;}
        if (sourceY > destY){scanDirY = 0 - 1;}
        else{scanDirY = 1;}

        var distance = Math.abs(sourceX-destX);

        for(var i=1;i<=distance-1;i+=1){
            var posX = sourceX + (i*scanDirX);
            var posY = sourceY + (i*scanDirY);
            if(getPiece(posX,posY,internalBoard)!=0){return false;}
        }
        return true;
    }}

    if(internalBoard[source]==4){//rook
        var scanDirX=0;
        var scanDirY=0;
        if (sourceX > destX){scanDirX = 0 - 1;}
        if(sourceX < destX){scanDirX = 1;}
        if(sourceX == destX){scanDirX = 0;}
        if (sourceY > destY){scanDirY = 0 - 1;}
        if(sourceY < destY){scanDirY = 1;}
        if(sourceY == destY){scanDirY = 0;}
        if(scanDirX!=0 &&scanDirY!=0){return false;}

        var distance = 0;
        if(destY!=sourceY){
            distance=Math.abs(sourceY-destY);}
            else{
                distance=Math.abs(sourceX-destX);
            }

        for(var i=1;i<=distance-1;i+=1){
            var posX = sourceX + (i*scanDirX);
            var posY = sourceY + (i*scanDirY);
            if(getPiece(posX,posY,internalBoard)!=0){

             //   console.log('Returned false for '+sourceX+','+sourceY+' to '+destX+','+destY+' because of piece at '+posX+','+posY+'. i='+i+', distance='+distance)
                return false;}

        }
        return true;
    }

    if(internalBoard[source]==5){//queen

        var rookLegal = false;
        var rookLegalSet = false;
        var bishopLegal=false;
        var bishopLegalSet = false;
        //start rook code
        var scanDirX=0;
        var scanDirY=0;
        if (sourceX > destX){scanDirX = 0 - 1;}
        if(sourceX < destX){scanDirX = 1;}
        if(sourceX == destX){scanDirX = 0;}
        if (sourceY > destY){scanDirY = 0 - 1;}
        if(sourceY < destY){scanDirY = 1;}
        if(sourceY == destY){scanDirY = 0;}
        if(scanDirX!=0 &&scanDirY!=0){
            if(!rookLegalSet){rookLegal=false;rookLegalSet=true;}
        }

        var distance = 0;
        if(destY!=sourceY){
            distance=Math.abs(sourceY-destY);}
            else{
                distance=Math.abs(sourceX-destX);
            }

        for(var i=1;i<=distance-1;i+=1){
            var posX = sourceX + (i*scanDirX);
            var posY = sourceY + (i*scanDirY);
            if(getPiece(posX,posY,internalBoard)!=0){


                if(!rookLegalSet){rookLegal=false;rookLegalSet=true;}}

        }
        if(!rookLegalSet){rookLegal=true;rookLegalSet=true;}
        //bishop start
        if(Math.abs(sourceX-destX) != Math.abs(sourceY - destY)){if(!bishopLegalSet){bishopLegal=false;bishopLegalSet=true;}} //fails if not perfectly diagonal

        if(getPiece(destX,destY,internalBoard)==0 | getPiece(destX, destY,internalBoard) > 6){
             scanDirX=0;
             scanDirY=0;
            if (sourceX > destX){scanDirX = 0 - 1;}
            else{scanDirX = 1;}
            if (sourceY > destY){scanDirY = 0 - 1;}
            else{scanDirY = 1;}

             distance = Math.abs(sourceX-destX);

            for(var i=1;i<=distance-1;i+=1){
                var posX = sourceX + (i*scanDirX);
                var posY = sourceY + (i*scanDirY);
                if(getPiece(posX,posY,internalBoard)!=0){if(!bishopLegalSet){bishopLegal=false;bishopLegalSet=true;}}
            }
            if(!bishopLegalSet){bishopLegal=true;bishopLegalSet=true;}
        }

        return (bishopLegal||rookLegal);
    }

    if(internalBoard[source]==3){//knight
        if((Math.abs(sourceX-destX)==2&&Math.abs(sourceY-destY)==1)||(Math.abs(sourceX-destX)==1&&Math.abs(sourceY-destY)==2)){return true;}return false;
     }


return false;

}
