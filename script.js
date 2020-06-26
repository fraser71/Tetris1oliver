//Shape Structure
// [ 
//   {x:0, y:0, c:color("red")}, 
//   ...
// ] 

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
  // 2. Create a shape if it doesn't exist
  if (fallingShape.length === 0) {
    createNewShape()
  }
  // 3. Move the shape down if it is time to move
  isReadyToMove();
  if (isReadyToMove()) {
    moveShape(fallingShape, 0, 1);
  }
  // 4. if the shape couldn't move then move the shape from fallingShape to the board

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
  fill(fallingShape[0].c);
  rect(fallingShape[0].x * blockSize, fallingShape[0].y * blockSize, blockSize, blockSize);
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
  shape[0].x += rowsX
  shape[0].y += rowsY
}

function isOverBoundary(shape) {
  if (fallingShape.y > height - blockSize / 2) {
  return true;
  }
  else{
    return false;
  }
}

function createNewShape() {
  fallingShape = [
    {
      x: 0,
      y: 0,
      c: color("red")
    }
  ];
}

function keyPressed() {
  print("keypressed")
  if (keyCode === LEFT_ARROW) { x -= blockSize }
  if (keyCode === RIGHT_ARROW) { x += blockSize }
  if (keyCode === DOWN_ARROW) { rotate(45) }
}
