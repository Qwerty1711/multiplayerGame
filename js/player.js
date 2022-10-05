class Player{
    constructor(){
        this.name = null
        this.index = null
        this.positionX = 0
        this.positionY = 0
        this.character = null
        this.hp = 100
    }
    addPlayer(){
        var playerIndex = "players/player" + this.index;

        this.positionX = 200
        this.positionY = 200

        database.ref(playerIndex).set({
            name: this.name,
            positionX: this.positionX,
            positionY: this.positionY,
            
        });
    }
    getCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", data => {
          playerCount = data.val();
        });
    }

    updateCount(count) {
        database.ref("/").update({
          playerCount: count
        });
      }
    
      update() {
        database.ref(playerIndex).update({
          positionX: this.positionX,
          positionY: this.positionY,
          rank: this.rank,
          score: this.score,
          life: this.life
        });
      }
    
      static getPlayersInfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data => {
          allPlayers = data.val();
        });
      }


}