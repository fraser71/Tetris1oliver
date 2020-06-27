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
  createCanvas(800, 800);
  rectMode(CENTER);
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
  
  // 5. draw the board

  // 6. draw the shape
  drawShape(fallingShape);

  // if (fallingShape.y > height - blockSize / 2) {
  //   fallingShape.y = 0

}

function drawBackground() {
  background(220);
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

function isReadyToMove() {
  var remain = frameCount % moveFrameCount;
  if (remain === 0) {
    return true;
  }
  else {
    return false;
  }
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

function isOverBoundary(shape) {
  for (var block in shape) {
    if (fallingShape[block].x > boundaries.r || fallingShape[block].x < boundaries.l || fallingShape[block].y > boundaries.b) {
      return true;
    }

  }
  return false;
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

function drawBoundaries(boundaries) {
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
  //if (keyCode === UP_ARROW) {moveShape(fallingShape, 0, -1);}
}