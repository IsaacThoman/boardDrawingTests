document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var rect = canvas.getBoundingClientRect();
    if('clientX' in e){
      relativeX = e.clientX - rect.left;
      relativeY = e.clientY - rect.top;
    }

    var closestSquare = 0;
    var closestDistance = 1000;
    for(var distanceTester = 0; distanceTester<sqrCentersX.length;distanceTester++){
      var myDist = Math.sqrt(((sqrCentersX[distanceTester]-relativeX)*(sqrCentersX[distanceTester]-relativeX)) + ((sqrCentersY[distanceTester]-relativeY)*(sqrCentersY[distanceTester]-relativeY)) )
      if(myDist<closestDistance){
        closestDistance = myDist;
        closestSquare = distanceTester;
      }
    }
console.log(closestSquare);

  }
