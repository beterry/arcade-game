# Dodge-a-Dinosaur
This project is coded with Javascript, HTML, and CSS and uses object-oriented programming to track the games characters. This game is a clone of the classic arcade game, Frogger.

## Features
  - 6x5 tile game board
  - 4 moving enemies with random spawns and speeds
  - 1 playable character
  - Score counter
  - Unique dinosaur theme

## Installation and Open
1. Clone directory into local storage
2. Open modern internet browser
3. Open _dodge-a-dinosaur.html_ in the browser (ctrl+o)

## How to use
### app.js
_app.js_ is the main script to run Dodge-a-Dinosaur. This file uses object-oriented programming to track the characters in the game.
#### Enemy
All enemies are pushed into an array _allEnemies_
##### properties
- x
  - position
- y
  - position
- row
- col
- speed
- width
- head
  - neccessary because _x_ only tracks the 'tail' end
- sprite
##### functions
- update()
  - called every time the game engine updates
- render()
  - paints the enemies in the canvas
- reset()
  - called when an enemy reaches the end of the game board
#### Hero
initailize a Hero called _player_
##### properties
- x
  - position
- y
  - position
- row
- col
- sprite
##### functions
- update()
  - checks if the player has reached the goal or collided with an enemy everytime the game engine updates
- render()
  - paints the player on the canvas
- handleInput()
  - updates properties depending on the user's input
- reset()
  - called when update() is true
#### Global variables and functions
- displayScore
- score
- player
- allEnemies
- numOfEnemies
  - edit to change the number of ememies on the game board
- randomSpeed()
- randomRow()
### engine.js
This script loads the images for the game and calls the update() and render() functions for both the enemies and the players every fraction of a second. The game board is nothing more than a "flipbook" which creates motion.
### resources.js
Caches images for better performance.
## Issues
If the width of your screen is less than 600px, the game will not load and you will get an "I'm Sorry" screen. Enlarge your window.
## Author
Ben Terry
developmentosaurus.com
