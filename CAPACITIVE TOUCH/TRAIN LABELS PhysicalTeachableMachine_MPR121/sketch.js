/*

Physical Teachable Machine. Default set to work with MPR121 sensors + Arduino. Can be edited to work with any set of sensor inputs.
For MPR121 it requires this datastream code:
https://git.arts.ac.uk/jsykes/Diploma23-24/tree/main/ComputationalEnvironments/Capacitive_touch/Arduino/MPR121_datastream
*/

//DATA
let serialDevice;
let incomingData;
let values = [];
let inputBuffer = "";

/* Expected range of received sensor data.
[min, max]
Edit this to suit the sensitivity of your sensors
*/
//INPUTS
let dataRange = [50, 400];


//ML
const NUM_INPUTS = 12;
const LABLES = ["Map Not Touched", "Seeing Inside (1)", "Seeing Across Time (2)", "Seeing Possibilities (3)"];


// UI
let dataButton;
let dataLabel;
let trainButton;
let connectButton;
let showVisualiser = true; //if you've trained data and no longer need this set to false.


function setup() {
  createCanvas(1000, 500);
  textFont("Source Code Pro");

  // SERIAL UI
  connectButton = createButton("Connect"); connectButton.mousePressed(connectToUsb);

  //UTILITIES
  utilitiesSetup();

  // ML5:
  console.log("ml5 version:", ml5.version);

  //MODEL
  dataButton.mousePressed(addExample);
  trainButton = createButton("train model");
  trainButton.mousePressed(trainModel);

  // Create the model.
  let options = {
    inputs: NUM_INPUTS,
    outputs: LABLES.length,
    task: "classification",
    debug: true,
  };
  brain = ml5.neuralNetwork(options);

  // Save and download the model
  let saveBtn = createButton("save model");
  saveBtn.mousePressed(function () {
    brain.save();
  });

  //SET INPUT DATA RANGE
  dataRange = [0, 500];


}


//------------------------------------------
// DO THINGS WITH CLASSIFICATION OUTPUTS
function draw() {
  background(255);
  if (showVisualiser && !!serialDevice) {
    visualiser();
  }

  //do shit.
  if (bTrainingCompleted) classify();
  drawOutputs();
  triggerOutputs(); //see function below
}


//------------------------------------------
function triggerOutputs() {
  //if training complete
  if (bTrainingCompleted) {
    //if there are results
    if (theResults && theResults.length > 0) {
      //print the results
      console.log(theResults[0].label);
      //print confidence value
      console.log(theResults[0].confidence);

      //do something with it
      //if label [0] is the result
      if (theResults[0].label == LABLES[0]) {
        resultCol = color(255, 0, 0);
      }

      //if label[1] is the result
      else if (theResults[0].label == LABLES[1]) {
        resultCol = color(0, 0, 255);
      }

         //if label[2] is the result
         else if (theResults[0].label == LABLES[2]) {
          resultCol = color(0, 255, 255);
        }


            else if (theResults[0].label == LABLES[3]) {
              resultCol = color(20,30,10);
        //change colour
        //do something else
      }
    }
    //only update the shape once at the end
    fill(resultCol);
    ellipse(width / 2, 70, 100, 100);
  }
}

//------------------------------------------
// Add a training example
function addExample() {
  let inputs = processData(); //update
  if (inputs && inputs.length > 0) {
    let target = dataLabel.value();
    brain.addData(inputs, [target]);

    for (var i = 0; i < LABLES.length; i++) {
      if (target === LABLES[i]) {
        sampleCounts[i]++;
      }
    }
  }
}
//------------------------------------------
// Train the model
function trainModel() {
  brain.normalizeData();
  let options = {
    epochs: 60,
  };
  brain.train(options, finishedTrainingCallback);
  bTrainingCompleted = true;
}

//------------------------------------------
// Begin prediction
function finishedTrainingCallback() {
  print("Finished Training");
}

//------------------------------------------
// Classify
function classify() {
  let inputs = processData();
  if (inputs && inputs.length > 0) {
    brain.classify(inputs, gotResultsCallback);
  }
}

//------------------------------------------
function gotResultsCallback(error, results) {
  if (results) {
    theResults = results;
  }
}

//------------------------------------------

// Connect USB
function connectToUsb() {
  if (!!serialDevice) return;
  serialDevice = new SerialDevice(
    115200,
    (data) => serialRead(data),
    (err) => serialError(err)
  );
  connectButton.html("Disconnect");
}