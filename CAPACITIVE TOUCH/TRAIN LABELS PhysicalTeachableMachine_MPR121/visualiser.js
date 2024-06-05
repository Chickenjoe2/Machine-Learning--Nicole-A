// Graph dimensions
let graphTop = 150;
let graphBottom;
let graphLeft = 100;
let graphRight;


// Width of bar representing sensor values
let barWidth;

// Sensor readings
let sensorReadings = [NUM_INPUTS]; 
let data = 0;
let y = 0;
let x = 0;
let smoothdata =0;
let rCol =['#41E2BA','#9b5de5','#fee440','#00bbf9','#f15bb5']

function visualiser() {
  fill(255);
  stroke('#2B2D42');
  strokeWeight(0.8);
  // Draw chart outline
  rect(
    graphLeft - barWidth,
    graphTop,
    graphRight - graphLeft + 2 * barWidth,
    graphBottom - graphTop,
    5
  );
  textSize(12);

  // Compute bar width
  barWidth = int(graphRight - graphLeft) / int(NUM_INPUTS * 1.5);

  
  // Draw sensor bars
  for (let i = 0; i < NUM_INPUTS; i++) {
    x = float(map(i, 0, NUM_INPUTS - 1, graphLeft, graphRight));
    
    data = sensorReadings[i]; 

    y = float(
      map(data, dataRange[0], dataRange[1], graphBottom, graphTop)
    );

   
    
    push();
    strokeWeight(barWidth);
    strokeCap(SQUARE);
    stroke(rCol[index]);
    line(x, graphBottom, x, y);
    pop();
    
    push();
    fill('#2B2D42');
    textAlign(CENTER);
    text(str(i), x - 0.5 * textWidth(i), graphBottom + 20);
    pop();
  }

  }
