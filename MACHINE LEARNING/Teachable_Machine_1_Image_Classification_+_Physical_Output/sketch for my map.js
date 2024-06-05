// Teachable Machine ml5 image example - modified from The Coding Train https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
let video;
let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/wnbYjKk1u/';


//Arduino comms variables
let port;
let connectBtn;
let value = 0;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');

}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO);
  video.hide();
  classifyVideo();

  //Arduino setup
  port = createSerial();

  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}



function draw() {
  background(0);
  image(video, 0, 0, width, 480);

  // STEP 4: Show image + current label if confidence is over a set value
 // if (label == "hand" && confidence > 0.9) {
  //  value = 90;
 // } else if (label == "person" && confidence > 0.9) {
  //  value; ue = 180;
 // } else if (label == "nothing") {
    //don't display any image
   // value = 0;
 // }
  if (label == "Seeing Inside" && confidence > 0.9) {
    value = 90;
  } else if (label == "Seeing Across Time" && confidence > 0.9) {
    value; ue = 180;
  } else if (label == "Seeing Possibilities") {
    value; ue = 270;
  }

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);

  //send to Arduino
  if (frameCount % 10 == 0) {
    port.write(value + '\n'); //finish with a newline character for Arduino recieving

  }

  // changes button label based on connection status
  if (!port.opened()) {
    connectBtn.html('Connect to Arduino');
  } else {
    connectBtn.html('Disconnect');
  }
}
//Arduino connect function
function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  } else {
    port.close();
  }
}


// STEP 2: Do the classifying
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  classifyVideo();
}
