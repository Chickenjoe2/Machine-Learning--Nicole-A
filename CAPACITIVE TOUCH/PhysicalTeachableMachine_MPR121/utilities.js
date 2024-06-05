/*
Classification Labels structure References Golan Levin's category selection and data labels methods from Hand Tracking example:
https://editor.p5js.org/golan/sketches/4UggchtU-
*/

//ML
let sampleCounts = [0, 0, 0];
let bTrainingCompleted = false;
let theResults;

//UI
let col = ["#1EA896", "#FF715B", "#E86A92"];
let bgCol = ["rgba(30,168,150,0.14)", "#FF715B2D", "#E86A924C"];
let lerpedSensor = [];
let index = 0;
let resultCol = 0;

function utilitiesSetup() {
  //viualiser info
  //chart dimensions based on window size
  graphBottom = height + 150 - graphTop - 80;
  graphRight = width - graphLeft;

  //labels
  dataLabel = createSelect();
  for (var i = 0; i < LABLES.length; i++) {
    dataLabel.option(LABLES[i]);
  }
  dataButton = createButton("add example");

  //smoothing
  for (let i = 0; i < NUM_INPUTS; i++) {
    lerpedSensor[i] = 0;
  }
  //colour changes
  index = int(random(rCol.length));
}

//references Golan Levin's methods here.
//draws label outputs
function drawOutputs() {
  if (bTrainingCompleted) {
    if (theResults && theResults.length > 0) {
      for (var j = 0; j < LABLES.length; j++) {
        var jthCategory = LABLES[j];

        for (var i = 0; i < theResults.length; i++) {
          var ithLabel = theResults[i].label;
          if (ithLabel === jthCategory) {
            var ithConfidence = theResults[i].confidence;

            var str = ithLabel + ": ";
            str += nf(ithConfidence, 1, 2);
            fill("#4C5454");
            noStroke();
            textSize(16);
            text(str, 170, 25 + j * 30);

            fill(bgCol[j]);
            rect(10, 10 + j * 30, 150, 20, 3);
            fill(col[j]);
            rect(10, 10 + j * 30, 100 * ithConfidence, 20, 3);
          }
        }
      }
    }
  } else {
    for (var j = 0; j < LABLES.length; j++) {
      var s = LABLES[j] + " samples: " + sampleCounts[j];
      fill("#4C5454");
      noStroke();
      textSize(16);
      text(s, 10, 25 + j * 30);
    }
  }
}