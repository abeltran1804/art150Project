# art150Project
Final project for Art 150 using an Arduino and P5.js

All files required to make project run. 

Additional programs needed:
Visual Studio Code (https://code.visualstudio.com/)
p5.serialcontrol (https://github.com/p5-serial/p5.serialcontrol/releases)
Arduino IDE (https://www.arduino.cc/en/software)

Additonal tools needed:
Live Server Extension (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
NPM (https://docs.npmjs.com/cli/v6/commands/npm-install)


To run:
1. Upload Arduino code to Circuit Playground Express using the Arduino IDE.
  a. Playground Circuit Express Library needs to be downloaded. (https://learn.adafruit.com/adafruit-circuit-playground-express/set-up-arduino-ide)
  b. Keep the board connected
2. Download p5.serialControl and follow steps based on OS (https://github.com/p5-serial/p5.serialcontrol)
  a. This may require installing npm (Node Package Manager) which will build the program.
  b. Once pm run package-mac (macOS) OR pm run package-win (Windows) finish launch the p5.serialControl app. 
  c. A list of available ports will show. Connect to the port that the Arduino is in. 
  d. Enable console and switch ASCII. You should start seeing a string on ints seperated by '|'
3. Open this repo in Visual Studio Code.
  a. Download Live Server Extension first.
  b. Launch a live server (at the bottom right corner).
  c. For best experinece make sure window is FULL Screen.
4. Have fun! :) 
