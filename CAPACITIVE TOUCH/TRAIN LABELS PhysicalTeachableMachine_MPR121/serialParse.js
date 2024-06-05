//------------------------------------------

/*Serial comms below do not edit*/


//------------------------------------------
// Parse Serial
//------------------------------------------

function parseSerialBuffer(buffer) {
  //console.log("Parsing " + buffer);
  try {
    // Parse string to extract  information
    let inString = trim(buffer); // remove whitespaces from beginning/end
    //console.log(inString)

    //split string at "Filt:"
    let nums = inString.split("Filt:");

    //find string that contains numbers
    let matches = nums[1].match(/\d+/g);
    //console.log(matches)

    // Convert the array of strings to an array of numbers
    let numbers = matches.map(function (item) {
      return parseInt(item, 10); // Use parseInt() to convert string to integer
    });

    // Now `numbers` contains only the numbers from the input string
    //console.log(numbers);

    let values = numbers;
    //map into visual parameters.
    for (let i = 0; i < values.length; i++) {
      //console.log(values[i]);
      if (i < NUM_INPUTS) {
        sensorReadings[i] = values[i];
      }
    }
  } catch (e) {
    e.printStackTrace();
  }
}

/// Read Serial

function serialRead(data) {
  // Read data from the serial buffer
  for (let n = 0; n < data.length; ++n) {
    let c = data[n];
    // copy data to temp buffer
    inputBuffer += c;
    if ("\n" == c) {
      // when we find a newline, we process what we have so far
      parseSerialBuffer(inputBuffer);
      // and then start over
      inputBuffer = "";
    }
  }
}

function serialError(err) {
  print("Error:", err);
}

function processData() {
  //get incoming values and push to array for training
  for (let i = 0; i < NUM_INPUTS; i++) {
    if (sensorReadings[i] > 0) {
      //is there any data?
      const sensorData = [];
      data = sensorReadings[i];
      sensorData.push(data);

      return sensorData;
    }
  }

  return null;
}
