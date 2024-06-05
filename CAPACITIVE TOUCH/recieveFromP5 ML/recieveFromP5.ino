
void setup() {
  Serial.begin(57600);
}

void loop() {
  // Read serial input:
  if (Serial.available() > 0) { //if serial is available
      // this would be the place to use the incoming value to drive an output
      int val = Serial.parseInt(); //convert the String to an int
       // Print the received value
     
      analogWrite(9, val);

    

      delay(15);
    
  }
}
