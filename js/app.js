let displayScore = document.getElementById('score');
let score = 0;
displayScore.textContent = score;

// Enemies our player must avoid
var Enemy = function(speed,row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //x position
    this.x = -83;
    //y position
    this.y = (row*83);
    //to calculate collisions
    this.row = row;
    this.col = 0;
    //speed
    this.speed = speed;
    this.width = 50;
    this.head = this.x + this.width;
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

      this.head = this.x + this.width;

      if (this.head > 404) {
        this.col = 5;
      } else if (this.head > 303 && this.head < 404) {
        this.col = 4;
      } else if (this.head > 202 && this.head < 303) {
        this.col = 3;
      } else if (this.head > 101 && this.head < 202) {
        this.col = 2;
      } else if (this.head > 0) {
        this.col = 1;
      }
    };



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.x = -83;
  this.row = randomRow();
  this.y = (this.row*83);
  this.col = 0;
  this.speed = randomSpeed();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Hero = function(){
  this.x = 202;
  this.y = 415;
  this.row = 5;
  this.col = 3;
  this.sprite = 'images/herbivore.png';

  this.update = function(){
    for (let enemy of allEnemies){
      if (this.row == enemy.row){
          if (this.col == enemy.col){
            this.reset();
          }
      }
    }
    if (this.row == 0){
      score += 1;
      displayScore.textContent = score;
      this.reset();
    }
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
          this.col -= 1;
          console.log('left key is pressed');
        }
        break;
      case 'right':
        if (this.x < 404){
          this.x += incrementX;
          this.col += 1;
          console.log('right key is pressed');
        }
        break;
      case 'down':
        if (this.y <415){
          this.y += incrementY;
          this.row += 1;
          console.log('down key is pressed');
        }
        break;
      case 'up':
        if (this.y > 0){
          this.y -= incrementY;
          this.row -= 1;
          console.log('up key is pressed');
        }
        break;
    }
  }

  this.reset = function(){
    this.x = 202;
    this.y = 415;
    this.row = 5;
    this.col = 3;
  }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Hero();
//init allEnemies array
let allEnemies = [];
//push new enemy into array
let numOfEnemies = 1;
for (let i = 0; i<numOfEnemies; i++){
  let raptor = new Enemy(randomSpeed(),randomRow());
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

function randomRow(){
  return (Math.floor(Math.random() * 4) + 1);
}

function checkVictory(){
  return (player.row == 0);
}
