const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  var boardResolution = canvas.width;

  var givenRotation = 0;
  var robotWidth = 100;
  var robotHeight = 70;
  var givenCenterX = 300;
  var givenCenterY = 300;

  var tPinch1 = 10;
  var tPinch2 = 0-10;

  animationTimer = window.setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  var xVals = []
  var yVals = []

givenRotation += 2;
  //(givenCenterX + ((robotWidth / 2) * Math.cos(givenRotation*3.14/180)) -
  //  ((robotHeight / 2) * Math.sin(givenRotation*3.14/180)))

      xVals.push(givenCenterX + (((robotWidth+tPinch1) / 2) * Math.cos(givenRotation*3.14/180)) - ((robotHeight / 2) * Math.sin(givenRotation*3.14/180)))
      yVals.push(givenCenterY + (((robotWidth+tPinch1) / 2) * Math.sin(givenRotation*3.14/180)) + ((robotHeight / 2) * Math.cos(givenRotation*3.14/180)))

      xVals.push(givenCenterX - (((robotWidth+tPinch1) / 2) * Math.cos(givenRotation*3.14/180)) - ((robotHeight / 2) * Math.sin(givenRotation*3.14/180)))
      yVals.push(givenCenterY - (((robotWidth+tPinch1) / 2) * Math.sin(givenRotation*3.14/180)) + ((robotHeight / 2) * Math.cos(givenRotation*3.14/180)))

      xVals.push(givenCenterX - (((robotWidth+tPinch2) / 2) * Math.cos(givenRotation*3.14/180)) + ((robotHeight / 2) * Math.sin(givenRotation*3.14/180)))
      yVals.push(givenCenterY - (((robotWidth+tPinch2) / 2) * Math.sin(givenRotation*3.14/180)) - ((robotHeight / 2) * Math.cos(givenRotation*3.14/180)))

      xVals.push(givenCenterX + (((robotWidth+tPinch2) / 2) * Math.cos(givenRotation*3.14/180)) + ((robotHeight / 2) * Math.sin(givenRotation*3.14/180)))
      yVals.push(givenCenterY + (((robotWidth+tPinch2) / 2) * Math.sin(givenRotation*3.14/180)) - ((robotHeight / 2) * Math.cos(givenRotation*3.14/180)))



  ctx.beginPath();
ctx.moveTo(xVals[0], yVals[0]);
ctx.lineTo(xVals[1],yVals[1]);
ctx.lineTo(xVals[2], yVals[2]);
ctx.lineTo(xVals[3], yVals[3]);
ctx.closePath();
ctx.fillStyle = "#000000";
ctx.fill();

  }, 32);
