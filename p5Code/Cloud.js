function Cloud() {
    this.x = random(-1000, -500);
    this.y = random(-300, -150);
    this.speed = random(2,5);

    this.moveCloud = function() {
      this.x += this.speed;
      if (this.x >= 1500) 
        this.x = random(-1000, -500);
    }
  
  }