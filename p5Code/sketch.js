// Setup for ports
var serial;         
var portName = '/dev/tty.usbmodem14101';  
// Capture Arduino values
var inData;  
var newValue; 
var b1, b2, slider, shaked, light, sound, temp;

// Global assets
let yoff = 0.0;
let miracleFont, catGif, mapPng;
let dogPng, cloudPng, moonPng, shipPng;
let fishCatPng, danceCatPng;
let rainS, seaS, pianoS;
// Lights
let starsX = [];
let starsY = [];

// Rain
let sliderPrev;
let rain = [];
let c1, c2, c3, c4, c5, c6;

// Ship 
let toggleShip;
let shipX;

let button, toggleOn;
// Clouds when not raininig.
let xCloud;
let clouds = [];

function preload() {
  rainS = loadSound('music/rain.mp3');
  seaS = loadSound('music/sea.mp3');
  pianoS = loadSound('music/piano.mp3');
  catGif = loadImage("images/cat.gif");
  mapPng = loadImage("images/map.png");
  cloudPng = loadImage("images/cloud.png");
  moonPng = loadImage("images/moon.png");
  shipPng = loadImage("images/ship.png");
  dogPng = loadImage("images/dog.gif");
  fishCatPng = loadImage("images/fishingCat.gif");
  danceCatPng = loadImage("images/danceCat.gif")
  miracleFont = loadFont("fonts/miracle.ttf");
}

function setup() {
  // Set the canvas to match the window size
  noStroke();
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  // button = createButton('start');
  // button.position(330,150);
  // button.mousePressed(startGame);
  toggleOn, toggleShip = false;
  shipX = -800; xCloud = -800;
  c1 = -800; c2 = -800; c3 = -800;
  c4 = 1500; c5 = 1500; c6 = 1500;
  // Asset setup.
  seaS.setVolume(0.05)
  seaS.loop();
  seaS.play();
  pianoS.setVolume(0.1)
  pianoS.loop();
  pianoS.play();
  rainS.setVolume(.1);
  mapPng.resize(900,900);
  moonPng.resize(150,150);
  shipPng.resize(400,400)
  dogPng.resize(80,80)
  catGif.resize(80,80);
  danceCatPng.resize(80, 100);
  fishCatPng.resize(90,90);
  catGif.delay(50);

  // Populate stars.
  populateStars();

  // Add rain droplets to array;
  populateRain();

  // Assign values.
  b1 = 0;
  b1 = 0;
  slider = 0;
  shaked = 0;
  light = 900;
  sound = 0;
  temp = 0;

  // Connect to serial port to listen to.
  serial = new p5.SerialPort();      
  serial.on('list', printList);
  serial.list();  
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);       
  serial.on('data', serialEvent);    
  serial.on('error', serialError);   
  serial.on('close', portClose);                        
  serial.open(portName);             
}

function startGame() {
  toggleOn = true;
  button.hide();
}
 
function draw() {
  // On button pressed.
  if (true) {
    // Use the light sensor.
    // Slider dependent (Rain)
    if (slider === 0) {
      decideTime();
    }
    else 
      cloudyTime();
    
    // Handle button cases.
    // B1 = Pirate ship appears.
    if (b1 == 1) 
      toggleShip = true;  

    // B2 = Lighthouse turns on.
    if (b2 ==1) {
      fill(255,255,0, 50);
      noStroke();
      ellipse(1200, 150, 200,200);
      }
    // Draw assets.

    drawConstants();
    // text(inData, 100, 100);
    // Draw rain if slider on.
    drawRain();
    if (toggleShip)
      showShip(5);
    else
      showShip(-5);
    noStroke();
    drawWaves(600, 655, color(217, 74, 30));

  } else {
    background(0);
    fill(255);
    textFont(miracleFont);
    textSize(64);
    text("Island Of Cats", 200, 80);
    
  }
}


function cloudyTime() {
  noStroke();
  skyHue = map(light, 0, 1023, 210, 180);
  skyBrightness = map(light, 0, 1023, 0, 80);
  background(skyHue, 21, skyBrightness);
  if (light <= 300) {
    showStars();
  }
  if (light <= 200) {
    image(moonPng, 250, 50);
  }
}

function drawRain() {
  soundRain();
  if (slider === 1) {
    if (sliderPrev === 0) {
      for (i = 0; i < rain.length; i++) {
        rain[i].y = random(30, 300);
        rain[i].splash();
      }
    }
    for (i = 0; i < rain.length; i++) {
      rain[i].dropRain();
      rain[i].splash();
    }
    sliderPrev = slider;
    drawClouds(15);
  } else {
    for (i = 0; i < rain.length; i++) {
      if (rain[i].y <= rain[i].yMax) {
        rain[i].dropRain();
        rain[i].splash();
      }
    }
    sliderPrev = slider;
    drawClouds(-15);
  }
}

function soundRain() {
  if (rainS.isPlaying() && slider == 0 ) {
    rainS.pause();}
  else if (!rainS.isPlaying() && slider == 1) {
    rainS.play(); rainS.setVolume(.1) }
}

function decideTime() { 
  // DayTime
  noStroke();
  // Sky
  skyHue = map(light, 0, 1023, 210, 180);
  skyBrightness = map(light, 0, 1023, 0, 190);
  background(skyHue, 21, skyBrightness);
  // Sun
  sunHue = map(light, 0, 1023, 20, 60);
  sunPosition = map(light, 0, 1023, 550, 100);
  fill(sunHue, 100, 100);
  ellipse(350, sunPosition, 100, 100);
  if (light <= 300) {
    showStars();
  }
  if (light <= 50) {
    image(moonPng, 250, 50);
  }
}

function drawClouds(move) {
  if (c1 > -1000 && slider == 0 || c1 < -200 && slider == 1)
    c1 += move;
  if (c2 > -1000 && slider == 0 || c2 < 0 && slider == 1)
    c2 += move; 
  if (c3 > -1000 && slider == 0 || c3 < 250 && slider == 1)
    c3 += move; 
  if (c4 > 550 && slider == 1 || c4 < 1800 && slider == 0)
    c4 -= move; 
  if (c5 > 800 && slider == 1 || c5 < 1800 && slider == 0)
    c5 -= move; 
  if (c6 > 1000 && slider == 1 || c6 < 1800 && slider == 0)
    c6 -= move; 
  image(cloudPng, c1, -170);
  image(cloudPng, c2, -220);
  image(cloudPng, c3, -170);
  image(cloudPng, c4, -170);
  image(cloudPng, c5, -220);
  image(cloudPng, c6, -170);
}

function showShip(move) {
  if (shipX > -1000 && !toggleShip || shipX < 240 && toggleShip)
    shipX += move;
  if (shipX >= 240)
    shipTime = millis();
  image(shipPng, shipX, 250)
  image(dogPng, shipX+150, 460);
}

function populateStars() {
  for (let i = 10; i < windowWidth; i+=random(20)+10) {
    append(starsX, i);
    append(starsY, random(500)+10);
  }
}

function populateRain() {
  for (i = 0; i < 8; i++) {
    clouds[i] = new Cloud();
  }

  for (i = 0; i < 100; i++) {
    rain[i] = new Rain(random(10, windowWidth), windowHeight);
  }
}

function showStars() {
  stroke(57, 93, 100);
  strokeWeight(2);
  for (let i = 0; i < starsX.length; i++) {
    point(starsX[i], starsY[i]);
  }
  noStroke();
}

function drawConstants() {
  textSize(16);
  textFont('Georgia');
  // Ocean.
  drawWaves(450, 505, color(217, 74, 39));
  // Image Assets
  image(mapPng, 630, -50);
  image(catGif, 850, 470);
  image(fishCatPng, 1250, 500);
  image(danceCatPng, 980, 280);
  moveClouds();
}

function drawWaves(y1, y2, c) {
  fill(c);
  beginShape();
  var xoff = yoff;
  for (var x = 0; x <= windowWidth; x += 10) {
    var y = map(noise(xoff, yoff), 0, 1, y1, y2);
    vertex(x, y);
    xoff += 0.05;
  }
  yoff += 0.01;
  vertex(windowWidth, windowHeight);
  vertex(0, windowHeight);
  endShape(CLOSE);
}

function moveClouds() {
  let maxC = map(light, 0, 1023, clouds.length, 0);
  for (let i = 0; i < maxC; i++) {
    clouds[i].moveCloud();
    image(cloudPng, clouds[i].x, clouds[i].y)
  }
}
// Functions to set up serial port 
// Lists ports available.
function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

// Break up our serial input.
// INPUT: <button1> <button2> <slider> <accelerometer> <light> <sound> <tempF>
// All inputs are sperated by '|' 
function serialEvent() {
  inData = serial.readLine();
  let splitData = split(inData, '|');
  if (splitData.length === 7) {
    b1 = int(trim(splitData[0]));
    b2 = int(trim(splitData[1]));
    slider = int(trim(splitData[2]));
    shaked = int(trim(splitData[3]));
    light = int(trim(splitData[4]));
    sound = int(trim(splitData[5]));
    temp = int(trim(splitData[6]));
    newValue = true;
  } else {
    newValue = false;
  }
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}
