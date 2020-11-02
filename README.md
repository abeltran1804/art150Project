# art150Project
Final project for Art 150 using an Arduino and P5.js

All files required to make project run. 

Additional programs needed:
- Visual Studio Code (https://code.visualstudio.com/)
- p5.serialcontrol (https://github.com/p5-serial/p5.serialcontrol/releases)
- Arduino IDE (https://www.arduino.cc/en/software)

Additonal tools needed:
- Live Server Extension (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- NPM (https://docs.npmjs.com/cli/v6/commands/npm-install)


To run:
- Upload Arduino code to Circuit Playground Express using the Arduino IDE.
  - Playground Circuit Express Library needs to be downloaded. (https://learn.adafruit.com/adafruit-circuit-playground-express/set-up-arduino-ide)
  - Keep the board connected
- Download p5.serialControl and follow steps based on OS (https://github.com/p5-serial/p5.serialcontrol)
  - This may require installing npm (Node Package Manager) which will build the program.
  - Once pm run package-mac (macOS) OR pm run package-win (Windows) finish launch the
- serialControl app. 
  - A list of available ports will show. Connect to the port that the Arduino is in. 
  - Enable console and switch ASCII. You should start seeing a string on ints seperated by '|'
- Open this repo in Visual Studio Code.
  - Download Live Server Extension first.
  - Launch a live server (at the bottom right corner).
  - For best experinece make sure window is FULL Screen.
- Have fun! :) 
