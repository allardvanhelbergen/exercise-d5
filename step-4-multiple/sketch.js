
// Initialise namespace 'My Sketch'.
var mys = {};

mys.config = {
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 200,
  CANVAS_CLASS: 'sketch-canvas',
  canvas1: {
    BG_COLOR: 255
  },
  canvas2: {
    BG_COLOR: 255
  },
  canvas3: {
    BG_COLOR: 0
  },
  canvas4: {
    BG_COLOR: 0
  }
};


mys.keyboardControls = function(sketch, color) {
  // Clear image on keypress 'r'
  if (sketch.keyIsPressed && sketch.key === 'r') {
    sketch.background(color);
  }
}


mys.sketch1 = function(sketch) {
  sketch.setup = function() {
    var canvas = sketch.createCanvas(mys.config.CANVAS_WIDTH, mys.config.CANVAS_HEIGHT);
    canvas.class(mys.config.CANVAS_CLASS);
    // White background
    sketch.background(mys.config.canvas1.BG_COLOR);
    // Set drawing mode from the center within a certain radius
    sketch.rectMode(sketch.RADIUS);
  };

  sketch.draw = function() {
    if (sketch.mouseIsPressed && sketch.mouseButton === sketch.LEFT) {
      // Light-grey stroke
      sketch.stroke(170);
      // Semi-transparent black fill
      sketch.fill(0, 0, 0, 150);
      // Draw rectangle at mouse point, with random size
      sketch.rect(sketch.mouseX, sketch.mouseY, sketch.random(6), sketch.random(6));
    }

    mys.keyboardControls(sketch, mys.config.canvas1.BG_COLOR);
  };
};


mys.sketch2 = function(sketch) {
  sketch.setup = function() {
    var canvas = sketch.createCanvas(mys.config.CANVAS_WIDTH, mys.config.CANVAS_HEIGHT);
    canvas.class(mys.config.CANVAS_CLASS);
    // White background
    sketch.background(mys.config.canvas2.BG_COLOR);
    // Set drawing mode from the center
    sketch.rectMode(sketch.CENTER);
  };

  sketch.draw = function() {
    if (sketch.mouseIsPressed && sketch.mouseButton === sketch.LEFT) {
      sketch.stroke(170);
      sketch.fill(120, 60);
      sketch.rect(sketch.mouseX, sketch.mouseY, 2, 2)
      // Variable pmouse is the mouse position a tthe previous frame
      sketch.rect(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
    }

    mys.keyboardControls(sketch, mys.config.canvas2.BG_COLOR);
  };
};


mys.sketch3 = function(sketch) {
  var angle;
  var inc;

  sketch.setup = function() {
    var canvas = sketch.createCanvas(mys.config.CANVAS_WIDTH, mys.config.CANVAS_HEIGHT);
    canvas.class(mys.config.CANVAS_CLASS);
    sketch.background(mys.config.canvas3.BG_COLOR);
    sketch.rectMode(sketch.CENTER);

    angle = 0;
    inc = 0;
  };

  sketch.draw = function() {
    // Map mouseX to range 0.01 - 0.08
    inc = sketch.map(sketch.mouseX, 0, sketch.width, 0.01, 0.08);
    angle += inc;

    if (sketch.mouseIsPressed && sketch.mouseButton === sketch.LEFT) {
      sketch.stroke(170);
      sketch.fill(120, 60);
      sketch.rect(sketch.mouseX, sketch.mouseY, 2, 2)
      // Variable pmouse is the mouse position a tthe previous frame
      sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);

      // Oscillate the radius
      var radius = 30 * sketch.abs(sketch.sin(sketch.frameCount));
      var firstTempX = sketch.mouseX + radius * sketch.cos(angle);
      var firstTempY = sketch.mouseY + radius * sketch.sin(angle);
      var secondTempX = sketch.mouseX + radius * sketch.cos(-angle);
      var secondTempY = sketch.mouseY + radius * sketch.sin(-angle);
      var tempW = sketch.random(3);

      // Draw lines and circles, using transparency
      sketch.stroke(110, 110, 110, 100);
      sketch.line(sketch.mouseX, sketch.mouseY, firstTempX, firstTempY);
      sketch.line(sketch.mouseX, sketch.mouseY, secondTempX, secondTempY);
      sketch.ellipse(firstTempX, firstTempY, tempW, tempW);
      sketch.ellipse(secondTempX, secondTempY, tempW, tempW);
    }

    mys.keyboardControls(sketch, mys.config.canvas3.BG_COLOR);
  };
};


mys.sketch4 = function(sketch) {
  var delayCount;
  var targetCount;

  sketch.setup = function() {
    var canvas = sketch.createCanvas(mys.config.CANVAS_WIDTH, mys.config.CANVAS_HEIGHT);
    canvas.class(mys.config.CANVAS_CLASS);
    sketch.background(mys.config.canvas4.BG_COLOR)

    delayCount = 0;
    // Set targetCount to random int
    targetCount = sketch.random(15, 30) | 0;
  };

  sketch.draw = function() {
    var style;
    delayCount++;

    if (delayCount === targetCount) {
      style = sketch.random(4) | 0;
      targetCount = sketch.random(5, 15) | 0;
      delayCount = 0;
    } else {
      style = 0
    }

    if (sketch.mouseIsPressed && sketch.mouseButton === sketch.LEFT) {
      sketch.stroke(sketch.random(0, 255));
      sketch.fill(sketch.random(0, 255), sketch.random(0, 255), sketch.random(0, 255));

      switch (style) {
        case 0:
          // Draw point
          sketch.stroke(sketch.random(155, 255));
          sketch.point(sketch.mouseX, sketch.mouseY);
          break;
        case 1:
          // Draw circle with random radius
          var circleSize = sketch.random(1, 20);
          sketch.ellipse(
              sketch.mouseX, sketch.mouseY,
              sketch.random(circleSize - 1, circleSize), sketch.random(circleSize - 1, circleSize));
          break;
        case 2:
          // Draw rectangle with random size
          var rectangleSize = sketch.random(1, 10);
          sketch.quad(
              sketch.mouseX - rectangleSize, sketch.mouseY,
              sketch.mouseX, sketch.mouseY - rectangleSize,
              sketch.mouseX + rectangleSize, sketch.mouseY,
              sketch.mouseX, sketch.mouseY + rectangleSize);
          break;
        case 3:
          // Draw triangle with random size
          var triangleSize = sketch.random(1, 5);
          sketch.triangle(
              sketch.mouseX - triangleSize, sketch.mouseY + triangleSize,
              sketch.mouseX, sketch.mouseY - triangleSize,
              sketch.mouseX + triangleSize, sketch.mouseY + triangleSize);
          break;
      }
    }

    mys.keyboardControls(sketch, mys.config.canvas4.BG_COLOR);
  }
};


// Load the sketches into the DOM
mys.canvas1 = new p5(mys.sketch1, 'canvas-1');
mys.canvas2 = new p5(mys.sketch2, 'canvas-2');
mys.canvas3 = new p5(mys.sketch3, 'canvas-3');
mys.canvas4 = new p5(mys.sketch4, 'canvas-4');
