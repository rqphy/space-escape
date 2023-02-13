# Space Escape

## Main idea

This my first school project ever! We’re a group of 5 freshmen who discovered Javascript 2 months ago. I’m fully in charge of the development.

Here are the specifications:

- Create the video game of your choice
- The resolution will be fixed at 1366px by 750px
- Needs to be in Javascript w/o framework
- Deadline in 4 days

Ok here we go. Let’s try to make a multiplayer game. I don’t have any backend class yet, so it will be local multiplayer. Everyone in the group love Star Wars so we will create a spaceship game.

## The storytelling

Captain Gerald and his team are coming back from their mission. They are on their way to Coruscant to give a secret file with the name of spies. Unfortunately, the spies found them and attack The Captain’s ship. His weapons are destroyed, and the ship is on fire. He needs to get to Coruscant as fast as he can to give the file to his superiors.

## The gameplay

### Player 1

The Player 1 has a fully defensive gameplay. He is the only one who can receive damage so I’ll have a variable for his health points value.

The first source of damage will come from himself. Like I said in the storytelling, the spaceship is on fire, because of that he will receive a DOT. To implement that, I just need to remove a certain amount of health points every second.

The second damage source will come from Player 2. The Player 1 will need to dodge Player 2’s shots. Every shot that hit Player’s 1 spaceship will remove health point.

I’ve explained you all the ways Player 1 can receive damage but you’ll probably ask: how can he survive? He needs to get mechanics parts, for each part that he takes, his health points will go up.

### Player 2

His main goal will be to destroy Player 1’s ship before he can land on Coruscant. He can’t decide when to shot. His ship is shooting on repeat and he needs to move his ship up and down to aim for Player 1’s ship.
