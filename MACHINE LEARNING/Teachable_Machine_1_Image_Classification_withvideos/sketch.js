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
let modelURL = 'https://teachablemachine.withgoogle.com/models/QqLA3Y_9b/';
let vid1, vid2, vid3;


// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  
  //vid1 = loadVideo('assets/vic1.mp4');
  //vid2 = loadVideo('assets/vic2.mp4');
  //vid3 = loadVideo('assets/vic3.mp4');
  //vid1 = createVideo('assets/vic1.mp4');
  //vid1.size(400, 400);
  //vid2 = createVideo('assets/vic2.mp4');
  //vid2.size(400, 400);
  //vid3 = createVideo('assets/vic3.mp4');
  //vid3.size(400, 400);

  vid1 = createVideo('assets/Vic11.mp4');
  vid1.hide();
  vid2 = createVideo('assets/Vic22.mp4');
  vid2.hide();
  vid3 = createVideo('assets/Vic33.mp4');
  vid3.hide();
}


function setup() {
  createCanvas(700, 700);
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
  image(video, 100, 50);

   //STEP 4: Draw the label
  textSize(80);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);


//Pick a video, for the default which is the "seeing inside" 

  //let vid1 = createVideo('assets/vic1.mp4');
   // vid1.size(400, 400);
   // vid1.loop();
  //if (label == "Seeing Inside") {
  //  vid1 = createVideo('assets/vic1.mp4');
   // vid1.size(400, 400);
   // vid1.loop();
  //} else if (label == "Seeing Across Time") {
  //  vid2 = createVideo('assets/vic2.mp4');
  //  vid2.size(400, 400);
  //  vid2.loop();
 // } else if (label == "Seeing Possibilities") {
 //   vid3 = createVideo('assets/vic3.mp4');
  //  vid3.size(400, 400);
  //  vid3.loop();

  if (label == "Seeing Inside") {
    vid1.show();
    vid1.loop();
    vid2.hide();
    vid3.hide();
    //image(vid1, 0, 0);
  } else if (label == "Seeing Across Time") {
    vid1.hide();
    vid2.show();
    vid2.loop();
    vid3.hide();
    //image(vid2, 0, 0);
  } else if (label == "Seeing Possibilities") {
    vid1.hide();
    vid2.hide();
    vid3.show();
    vid3.loop();
    //image(vid3, 0, 0);
  } else {
    vid1.hide();
    vid1.stop();
    vid2.hide();
    vid2.stop();
    vid3.hide();
    vid3.stop();
  }

  }

   //Draw the emoji
   //textSize(256);
    //text(video, width / 2, height / 2);







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
