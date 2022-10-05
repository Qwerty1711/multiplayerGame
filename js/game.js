class Game{
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }

    update(state) {
        database.ref("/").update({
          gameState: state
        });
    }

    handlePlayerMovement(){
        player.collide(edges)
        player.velocityY += 2
        if (player.isTouching(platforms) && player.velocityY > 0){
            player.collide(platforms)
            if (keyDown(UP_ARROW)){
                player.velocityY -= 20
            }
        }
        drawSprites()
        if (keyDown(RIGHT_ARROW)) {
            player.velocityX +=3
        }
        if (keyDown(LEFT_ARROW)) {
            player.velocityX -=3
        }
        player.velocityX *= 0.8
    }
    start(){
        player = new Player();
        playerCount = player.getCount();

        form = new Form();
        form.display();

        player1 = createSprite(200,200,40,40)
        player1.shapeColor = "red"

        player2 = createSprite(200,200,40,40)
        player2.shapeColor = "blue"

        players = [player1,player2]

        edges = new Group()
        platfroms = new Group()

        var edgesPositions = [
            {x:200,y:-5,width:400,height:10},
            {x:-5,y:200,width:10,height:400},
            {x:200,y:405,width:400,height:10},
            {x:405,y:200,width:10,height:400}
        ]

        var platformsPositions = [
            {x:200,y:400,width:400,height:50},
            {x:300,y:250,width:200,height:10}
        ]

        this.addSprites(edges, edges.length, edgesPositions)
        this.addSprites(platforms, platforms.length, platformsPositions)
        
    }

    addSprites(spriteGroup, numberOfSprites, positions = []) {
        for (var i = 0; i < numberOfSprites; i++) {
          var x, y, width, height;
    
          if (positions.length > 0) {
            x = positions[i].x;
            y = positions[i].y;
            width = positions[i].width;
            height = positions[i].height;
            
          }
          var sprite = createSprite(x, y, width, height);

          spriteGroup.add(sprite);
        }
    }

    play() {

        this.handleResetButton();
    
        Player.getPlayersInfo();
    
        if (allPlayers !== undefined) {
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
    
            players[index - 1].position.x = x;
            players[index - 1].position.y = y;
    
            if (index === player.index) {
              stroke(10);
              fill("red");
              ellipse(x, y, 60, 60);
    
              this.handleFuel(index);
              this.handlePowerCoins(index);
              this.handleCarACollisionWithCarB(index);
              this.handleObstacleCollision(index);
            }
    
              // Changing camera position in y direction
            camera.position.y = players[index - 1].position.y;
            

            player.update()
          }

    
          // handling keyboard events
          this.handlePlayerControls();
    
          drawSprites();
        }
    }

    handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
          });
          window.location.reload();
        });
      }
}