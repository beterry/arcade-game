//declare globals to store and display score
let displayScore = document.getElementById('score');
let score = 0;
displayScore.textContent = score;

// Enemies our player must avoid
// randomSpeed()  and randomRow() are passed below
var Enemy = function(speed,row) {
    //x position
    this.x = -83;
    //y position, each row is 83 pixels high
    this.y = (row*83);
    //to calculate collisions, keep track of which square
    //the ememies are in by tracking columns and rows
    this.row = row;
    this.col = 0;
    //speed
    this.speed = speed;
    //this is used to calculate the front on the sprite
    this.width = 50;
    this.head = this.x + this.width;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load img
    this.sprite = 'img/raptor.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      if (this.x < 505){ //505 is the width of the game board
        this.x += this.speed*dt;
        } else {
          this.reset();
      }
      //updates the front of the enemy
      this.head = this.x + this.width;
      //updates this.col to accuratly track the column
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

//used to reset the enemy to the left of the game board
Enemy.prototype.reset = function() {
  this.x = -83;
  this.row = randomRow();
  this.y = (this.row*83);
  this.col = 0;
  this.speed = randomSpeed();
};

//the playable character
var Hero = function(){
  //set coordinates
  this.x = 202;
  this.y = 415;
  //set row and column referance
  this.row = 5;
  this.col = 3;
  this.sprite = 'img/herbivore.png';

  //ran every tick of the game engine
  this.update = function(){
    //checks for enemies on the same row
    for (let enemy of allEnemies){
      if (this.row == enemy.row){
          //if enemy is also in the same column, reset
          if (this.col == enemy.col){
            this.reset();
          }
      }
    }
    //checks if the player is in the water
    //if so, resets player and updates score
    if (this.row == 0){
      score += 1;
      displayScore.textContent = score;
      this.reset();
    }
  }

  //draw the player on the screen
  this.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //intreprets arrow key input from user
  this.handleInput = function(key){
    //constants used to update x,y coordinates
    const incrementY = 83;
    const incrementX = 101;
    //a switch statment to update coordintes, rows, and columns
    switch(key){
      case 'left':
        if (this.x > 0){
          this.x -= incrementX;
          this.col -= 1;
        }
        break;
      case 'right':
        if (this.x < 404){
          this.x += incrementX;
          this.col += 1;
        }
        break;
      case 'down':
        if (this.y <415){
          this.y += incrementY;
          this.row += 1;
        }
        break;
      case 'up':
        if (this.y > 0){
          this.y -= incrementY;
          this.row -= 1;
        }
        break;
    }
  }

  //resets player to the beginning
  this.reset = function(){
    this.x = 202;
    this.y = 415;
    this.row = 5;
    this.col = 3;
  }

}

// Place the player object in a variable called player
let player = new Hero();
//init allEnemies array
let allEnemies = [];
//variable for number of enemies
let numOfEnemies = 4;
//push new enemies into array
for (let i = 0; i<numOfEnemies; i++){
  let raptor = new Enemy(randomSpeed(),randomRow());
  allEnemies.push(raptor);
}

// This listens for key presses and sends the keys to the
// Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//returns a random speed between 75 and 400
function randomSpeed(){
  return Math.floor(Math.random() * 400) + 75;
}

//returns a random row between 1 and 4
function randomRow(){
  return (Math.floor(Math.random() * 4) + 1);
}
