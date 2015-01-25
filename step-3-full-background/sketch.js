function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('canvas-container');
  myCanvas.class('my-canvas');
}

function draw() {
  if(mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }

  ellipse(mouseX, mouseY, 80, 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
