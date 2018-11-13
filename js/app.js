// Enemies our player must avoid
var Enemy = function(speed,path) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //x position
    this.x = -83;
    //y position
    this.y = (path*83);
    //to calculate collisions
    this.path = path;
    //to calculate collisions
    this.head = this.x + 123;
    //speed
    this.speed = speed;
    this.width = 123;
    this.height = 83;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/raptor.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505){
      this.x += Math.floor(this.speed*dt);
    } else {
        this.reset();
    }
    this.head = this.x + 123;
    if (this.path == player.path){
      if (this.x < player.x + player.width  && this.x + this.width  > player.x &&
  		this.y < player.y + player.height && this.y + this.height > player.y) {
          console.log('collision!');
      }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.x = -83;
  this.y = (randomPath()*83);
  this.path = randomPath();
  this.head = this.x + 123;
  this.speed = randomSpeed();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Hero = function(){
  this.x = 202;
  this.y = 415;
  this.path = 5;
  this.sprite = 'images/herbivore.png';
  this.update = function(){

    //check for a victory
  }
  this.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  this.handleInput = function(key){
    //update x and y according to input
    const incrementY = 83;
    const incrementX = 101;
    switch(key){
      case 'left':
        if (this.x > 0){
          this.x -= incrementX;
          console.log('left key is pressed');
        }
        break;
      case 'right':
        if (this.x < 404){
          this.x += incrementX;
          console.log('right key is pressed');
        }
        break;
      case 'down':
        if (this.y <415){
          this.y += incrementY;
          this.path += 1;
          console.log('down key is pressed');
        }
        break;
      case 'up':
        if (this.y > 0){
          this.y -= incrementY;
          this.path -= 1;
          console.log('up key is pressed');
        }
        break;
    }
  }
  this.reset = function(){
    this.x = 202;
    this.y = 415;
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Hero();
//init allEnemies array
let allEnemies = [];
//push new enemy into array
let numOfEnemies = 4;
for (let i = 0; i<numOfEnemies; i++){
  let raptor = new Enemy(randomSpeed(),randomPath());
  allEnemies.push(raptor);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function randomSpeed(){
  return Math.floor(Math.random() * 400) + 75;
}

function randomPath(){
  return (Math.floor(Math.random() * 4) + 1);
}

function randomSpawn(){
  return Math.floor(Math.random() * 4000);
}

function checkCollisions(){
  for (let i = 0; i<numOfEnemies; i++){
    if (allEnemies[i].head == player.x){
      return true;
    }
  }
  return false;
}
