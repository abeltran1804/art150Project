#include <Adafruit_Circuit_Playground.h>

void setup() {
  // initialize the serial port for communication
  Serial.begin(115200);
  CircuitPlayground.begin();
}

float getTotalAccel() {
  // Compute total acceleration
  float X = 0;
  float Y = 0;
  float Z = 0;
  for (int i=0; i<10; i++) {
    X += CircuitPlayground.motionX();
    Y += CircuitPlayground.motionY();
    Z += CircuitPlayground.motionZ();
    delay(1);
  }
  X /= 10;
  Y /= 10;
  Z /= 10;
 
  return sqrt(X*X + Y*Y + Z*Z);
}

void loop() {
  // Left Button
  Serial.print(CircuitPlayground.leftButton());
  Serial.print("|");
  // Right Button
  Serial.print(CircuitPlayground.rightButton());
  Serial.print("|");
  // Slider
  Serial.print(CircuitPlayground.slideSwitch());  
  Serial.print("|");
  // Accelerometer
  if (getTotalAccel() > 12)
    Serial.print("1"); 
  else
    Serial.print("0"); 
  Serial.print("|");
  // Light
  Serial.print(CircuitPlayground.lightSensor());
  Serial.print("|");  
  // Sound
  Serial.print(CircuitPlayground.soundSensor()); 
  Serial.print("|");
  // Temp
  Serial.print(CircuitPlayground.temperatureF()); 
  Serial.println("");

  
  delay(500);
}
