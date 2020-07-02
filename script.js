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
var fallingShape = []  // This is a NON-shape <fallingShape.length == 0> 
var board = [];        // This is an empty board
var blockSize = 20;
var moveFrameCount = 60;

function setup() {
  createCanvas(800, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
  setupBoard();
  print(board);
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
  isReadyToMove();
  if (isReadyToMove()) {
    moveShape(fallingShape, 0, 1);
  }
  rotateShape();
  addBlocks();
  // 5. draw the board
  drawBoard();
  // fill(0)
  // rect(board[0].x, board[0].y, 20, 20)
  // 6. draw the shape
  drawShape(fallingShape);

  // if (fallingShape.y > height - blockSize / 2) {
  //   fallingShape.y = 0

}





//~~WARNING~~ YOU ARE NOW ENTERING A RESTRICTED AREA OF DEFINING FUNCTIONS! DO YOU WISH TO CONTINUE?




function drawBackground() {
  background(50, 0, 255);
  translate(width / 2, blockSize);
}

function drawShape() {
  var block;
  for (block in fallingShape) {
    fill(fallingShape[block].c);
    rect(fallingShape[block].x * blockSize, fallingShape[block].y * blockSize, blockSize, blockSize);
    //print(block);
  }
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
  fallingShape = [
    {
      x: 0,
      y: 0,
      c: color("red")
    },
    {
      x: 1,
      y: 0,
      c: color("red")
    },
    {
      x: -1,
      y: 0,
      c: color("red")
    },
    {
      x: 0,
      y: 1,
      c: color("red")
    }
  ];
}


function moveShape(shape, rowsX, rowsY) {
  for (block in shape) {
    shape[block].x += rowsX
    shape[block].y += rowsY
  }
  // 4. if the shape couldn't move then move the shape from fallingShape to the board
  if (isOverBoundary(fallingShape)) {
    for (block in shape) {
      shape[block].x -= rowsX
      shape[block].y -= rowsY
    }
  }
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
    if (isOverBoundary(shape)) {
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
  board[0][0] = {
    x: 0,
    y: 20,
    c: color("green")
  },
    board[0][1] = {
      x: 2,
      y: 20,
      c: color("green")
    },
    board[0][2] = {
      x: 1,
      y: 20,
      c: color("green")
    },
    board[0][3] = {
      x: -1,
      y: 20,
      c: color("green")
    }

}

function drawBoard() {
  for (var row of board) {
    for (var block of row) {
      //if(frameCount < 100) print(block);
      fill(block.c);
      rect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
    }
  }
}

function detectCrash() {

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