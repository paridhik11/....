class Game{
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
    
        this.leadeboardTitle = createElement("h2");
    
        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
        //this.playerMoving=false
      }        
    
    getState(){
        var base=database.ref("gameState")
        base.on("value",function(data){
            gameState=data.val()
        })
    }

    update(state){
database.ref("/").update({
    gameState:state
})
}
    start() {
        player = new Player();
        playerCount = player.getCount();
    
        form = new Form();
        form.display();
    
        surfer1 = createSprite(width / 2 - 50, height - 100);
        surfer1.addImage("surfer1",surferimg);
     surfer1.scale = 0.07;
    
        surfer2 = createSprite(width / 2 + 100, height - 100);
        surfer2.addImage("surfer2", surferimg);
        surfer2.scale = 0.07;
    
      surfers = [surfer1,surfer2];
    
        fuels = new Group();
       goldCoins = new Group();
       bigball=new Group();
      trash=new Group()
       
      var trashPosition = [
        { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
        { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
        { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
        { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
        { x: width / 2, y: height - 2800, image: obstacle2Image },
        { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
        { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
        { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
        { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
        { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
        { x: width / 2, y: height - 5300, image: obstacle1Image },
        { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
      ];
      this.addSprites(fuels, 4, fuelimg, 0.02);

      this.addSprites(goldCoins, 18, coinsimg, 0.09);

      this.addSprites(bigball,7,ballimg,0.04)
    //Adding obstacles sprite in the game
    this.addSprites(
    trash,
     trashPositions.length,
      trashimg,
      0.04,
     trashPositions
    );
  }

  play(){

 Player.getPlayersInfo()
 var index = 0;
      if(allPlayers!==undefined){
          for(var i in allPlayers){
            index = index + 1;
          
          var x = allPlayers[i].positionX;
        var y = height - allPlayers[i].positionY;

        surfers[index - 1].position.x = x;
        surfers[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleFuel(index);
          this.handlePowerCoins(index);

          // Changing camera position in y direction
          camera.position.y = cars[index - 1].position.y;
        }
      }
      }
  }

    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []){
        for (var i = 0; i < numberOfSprites; i++) {
          var x, y;
    
          //C41 //SA
          if (positions.length > 0) {
            x = positions[i].x;
            y = positions[i].y;
            spriteImage = positions[i].image;
          } else {
            x = random(width / 2 + 150, width / 2 - 150);
            y = random(-height * 4.5, height - 400);
          }
          var sprite = createSprite(x, y);
          sprite.addImage("sprite", spriteImage);
    
          sprite.scale = scale;
          spriteGroup.add(sprite);
        } 
    }
    handleFuel(index) {
        // Adding fuel
        surfers[index - 1].overlap(fuels, function(collector, collected) {
          player.fuel = 185;
          //collected is the sprite in the group collectibles that triggered
          //the event
          collected.remove();
        });
        if(player.fuel>0 && this.playerMoving){
    player.fuel-=0.3
        }
         if(player.fuel<=0){
    gameState=2
    this.gameOver()
         }
      }
      handlePowerCoins(index) {
        cars[index - 1].overlap(powerCoins, function(collector, collected) {
          player.score += 21;
          player.update();
          //collected is the sprite in the group collectibles that triggered
          //the event
          collected.remove();
        });
      }
}
  
