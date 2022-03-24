var game, player, form
var canvas,database
var bgimg,ballimg,fuelimg,blastimg,trashimg,coinsimg,surferimg

function preload(){
   bgimg=loadImage("background.jpg")
   ballimg=loadImage("bigball1.png")
   blastimg=loadImage("blast.png")
   fuelimg=loadImage("fuel.png")
   trashimg=loadImage("trash.png")
   coinsimg=loadImage("goldCoin.png")
   surferimg=loadImage("surfer.png")
}

function setup(){
    createCanvas(1200,900)
    database=firebase.database()
    game=new Game()
}

function draw(){
    background(bgimg)
    if (playerCount === 2) {
        game.update(1);
      }
    
      if (gameState === 1) {
        game.play();
      }
        
}