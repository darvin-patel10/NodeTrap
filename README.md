#NodeTrep#

Live Demo: https://nodetrep.netlify.app/

About the Game

-> Two-player turn-based gameplay
-> Time-bound turns (5 seconds per move)
-> Fault system for missed turns
-> Strategy-driven win conditions
-> Smooth SVG-based board interactions
-> Fully responsive UI

Tech Stack

-> Frontend: React.js, JavaScript, HTML, CSS
-> Graphics: SVG (custom paths & board design)
-> State Management: React Hooks

Game Flow

-> Each player has two nodes (pieces)
-> Players get 5 seconds per turn
-> Missing a turn counts as a fault
-> Initially, players must place both nodes on the board
-> After placement, only one node can be moved per turn
-> Movement is allowed only to the exact next empty position
-> A valid path must exist between the current and next position

Game Over Conditions

-> If a player has no valid move available, they lose the game
-> If a player receives 2 faults, they lose the game