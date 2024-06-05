// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
// https://editor.p5js.org/codingtrain/sketches/PoZXqbu4v

// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/wnbYjKk1u/';
let animation;

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  img1 = loadImage('assets/vic1.png');
  img2 = loadImage('assets/vic2.png');
  img3 = loadImage('assets/vic3.png');
  
}


function setup() {
  createCanvas(2500, 3500);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  // STEP 2: Start classifying
  classifyVideo();
  


}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  //Draw the video feed
  image(video, 0, 0);

   //STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);


//Pick a video, for the default which is the "seeing inside" 

  let animation = image(img1, 0, 0,2500, 3500);
  if (label == "Seeing Inside") {
    animation = image(img1, 0, 0,2500, 3500);
  } else if (label == "Seeing Across Time") {
    animation = image(img2, 0, 0, 2500, 3500);
  } else if (label == "Seeing Possibilities") {
    animation = image(img3, 0, 0, 2500, 3500);
  }

   //Draw the emoji
   textSize(256);
    text(video, width / 2, height / 2);


}




// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
