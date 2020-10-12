# Dodge_Fu

## Overview

* Dodge Fu will be a relative clone of the [One Finger Death Punch](https://youtu.be/R1j0VE6d-xE?t=7)


* My App will allow a player to defend theirself against projectiles from both sides. Specific keys on a keyboard must be pressed at a specific time to destroy incoming projectiles. Three lives to last as long as you can!

### MVPS
1. General layout with central character
2. Projectiles, Randomness and origin from both sides
3. Destruction of Projectiles given response.
4. Visual display of different projectiles and background
5. Fight music implementation
Bonus: Response movement of the central character 

### Technologies, Libraries, APIs

Pure Javacript to generate the game mechanics.
Will use canvas elements to render and move the center character as well as the arrows over time. Will use collision detection with the "attack squares" of the center character.
JS animate will be used as well.

### Wireframe

![](src/images/Homepage.png)

### Implementation Timeline
 
* Day 1: 
 Set up the general layout for my project and get webpack up and running. 
 General Layout will include Github, Linkedin links and game description
 Write basic entry file and learn basics of canvas.

* Day 2: 
Build out the stick figure and Arrow objects. Use fight.js to create and render a rectangle fight stage. Code creation of arrows as well as flight path across screen. 

* Day 3: 
Create Zone of destruction object, which will destroy arrows when the correct keys are pressed. Finish implementation of arrows, which will involve their successful deletion and generation of keys to destroy them.

* Day 4: 
Implement fighting music and a mute button that can be clicked to turn off the soundtrack.
Create controls to increase the speed, thus the difficulty, of the game.

Bonus Features:
Movement of the stick figure character corresponding to which arrow it destroys. 
Combo score values based on characters pressed.

