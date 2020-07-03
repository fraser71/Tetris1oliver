//Shape Structure
// [ 
//   {x:0, y:0, c:color("red")}, 
//   ...
// ] 

var boundaries = {
  l: -10.5,
  r: 10.5,
  b: 20.5
}
var fallingShape = [];  // This is a NON-shape <fallingShape.length == 0> 
var board = [];        // This is an empty board
var blockSize = 20;
var moveFrameCount = 60;

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  setupBoard();
}

function draw() {
  // 1. Clear the screen and setup the background
  drawBackground();
  drawBoundaries(boundaries);
  // 2. Create a shape if it doesn't exist
  if (fallingShape.length === 0) {
    createNewShape()
  }
  // 3. Move the shape down if it is time to move
  if (isReadyToMove()) {
    if (!moveShape(fallingShape, 0, 1)) {
      addBlocksToBoard(fallingShape)
      fallingShape = []
    }
  }

  // 5. draw the board
  addBlocksToBoard();
  drawBoard();

  // 6. draw the shape
  drawShape(fallingShape);

  // if (fallingShape.y > height - blockSize / 2) {
  //   fallingShape.y = 0

}





//~~WARNING~~ YOU ARE NOW ENTERING A RESTRICTED AREA OF DEFINING FUNCTIONS! DO YOU WISH TO CONTINUE?




function drawBackground() {
  background(50, 20, 205);
  translate(width / 2, blockSize);
  fill("white");
  rect(0, boundaries.b * blockSize / 2, (boundaries.r - boundaries.l) * blockSize, boundaries.b * blockSize)
}

function drawShape(shape) {
  var block;
  for (block in shape) {
    fill(shape[block].c);
    rect(shape[block].x * blockSize, shape[block].y * blockSize, blockSize, blockSize);
  }
}

function copyObject(object) {
  var newObject = {};
  for (var property in object) {
    newObject[property] = object[property]
  }
  return newObject;
}

function isOverBoundary(shape) {
  for (var block in shape) {
    if (fallingShape[block].x > boundaries.r || fallingShape[block].x < boundaries.l || fallingShape[block].y > boundaries.b) {
      return true;
    }

  }
  return false;
}

function isReadyToMove() {
  var remain = frameCount % moveFrameCount;
  if (remain === 0) {
    return true;
  }
  else {
    return false;
  }
}

function createNewShape() {
  var newShapeNum = floor(random(0, shapeLibrary.length));
  var newShape = shapeLibrary[newShapeNum];
  var newShapeCopy = []
  for (var block of newShape) {
    newShapeCopy.push(copyObject(block));
  }
  if (detectCrash(newShapeCopy)) {
    fill(140, 102, 153);
    textSize(32);
    text('Game Over', 3 * blockSize, 6 * blockSize);
    noLoop()
  }else{
    fallingShape = newShapeCopy;
  }
}


function moveShape(shape, rowsX, rowsY) {
  for (block in shape) {
    shape[block].x += rowsX;
    shape[block].y += rowsY;
  }
  // 4. if the shape couldn't move then move the shape from fallingShape to the board
  if (isOverBoundary(fallingShape) || detectCrash(fallingShape)) {
    for (block in shape) {
      shape[block].x -= rowsX;
      shape[block].y -= rowsY;
    }
    return false;
  }
  return true;
}


function rotatePoint(origin, point, angle) {
  //print(qx, qy);
  /*
  Rotate a point counterclockwise by a given angle around a given origin.
  The angle should be given in radians.
  */
  //rotatePoint(fallingShape[0], fallingShape[2], 90);

  var ox = origin.x;
  var oy = origin.y;
  //print(origin);
  var sx = point.x;
  var sy = point.y;
  //print(point);
  var qx = ox + cos(angle) * (sx - ox) - sin(angle) * (sy - oy);
  var qy = oy + sin(angle) * (sx - ox) + cos(angle) * (sy - oy);

  var answer = {
    x: round(qx),
    y: round(qy),
    c: point.c
  };
  //print(answer);
  return answer;
}

function rotateShape(shape, degrees) {
  for (var block in shape) {
    //first block is origin
    if (block == 0) {
      continue;
    }
    shape[block] = rotatePoint(shape[0], shape[block], degrees);
    if (isOverBoundary(shape) || detectCrash(shape)) {
      shape[block] = rotatePoint(shape[0], shape[block], -degrees);
      return true;
    }
  }
  return false;
}

function setupBoard() {
  var boardWidth = boundaries.r - boundaries.l;
  var boardHeight = boundaries.b + 0.5;
  for (var rowNumbr = 0; rowNumbr < boardHeight; rowNumbr++) {
    board[rowNumbr] = []
  }
}

function addBlocksToBoard(shape) {
  //go through all blocks in shape and copy to board[][]
  for (var block in shape) {
    board[shape[block].y][shape[block].x - round(boundaries.l)] = shape[block].c
  }

}

function drawBoard() {
  for (var row in board) {
    for (var column in board[row]) {

      if (board[row][column]) {
        fill(board[row][column]);
        rect((int(column) + round(boundaries.l)) * blockSize, row * blockSize, blockSize, blockSize);
      }
    }
  }
}

function printif(...args) {
  if (frameCount < 10)
    print(args)
}

function detectCrash(shape) {
  
  for (var block in shape) {
    if (board[shape[block].y][shape[block].x - round(boundaries.l)]) {
      print(shape[block])
      return true;
    }
  }
  return false;
}

function checkForFullRow() {

}

function deleteFullRow() {

}

function moveRowsDown() {

}

function drawBoundaries(boundaries) {
  strokeWeight(4);
  //left
  line(boundaries.l * blockSize, 0 * blockSize, boundaries.l * blockSize, boundaries.b * blockSize);
  //right
  line(boundaries.r * blockSize, 0 * blockSize, boundaries.r * blockSize, boundaries.b * blockSize);
  //bottom
  line(boundaries.l * blockSize, boundaries.b * blockSize, boundaries.r * blockSize, boundaries.b * blockSize);
}

function keyPressed() {
  //print("keypressed")
  if (keyCode === LEFT_ARROW) { moveShape(fallingShape, -1, 0); }
  if (keyCode === RIGHT_ARROW) { moveShape(fallingShape, 1, 0); }
  if (keyCode === DOWN_ARROW) { moveShape(fallingShape, 0, 1); }
  if (keyCode === UP_ARROW) { rotateShape(fallingShape, -90); }
  if (keyCode === 192) { moveShape(fallingShape, 0, -2); }
  if (keyCode === 82) { /*restart */ }
}