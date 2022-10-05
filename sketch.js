var player, edges, platforms
var canvas;
var database, gameState;
var form, player, playerCount;
var allPlayers, player1, player2;
var players = [];

function preload(){

}

function setup(){
    canvas = createCanvas(400, 400);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
    
}

function draw(){
    background(0);
    if (playerCount === 2) {
      game.update(1);
    }
  
    if (gameState === 1) {
      game.play();
    }
  
    if (gameState === 2) {
        game.end();
    }
}
