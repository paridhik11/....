class Player{
    constructor(){
        this.name=null
        this.positionX=0
        this.positionY=0
        this.index=null
    }

    getCount(){
     var countRef=database.ref("playerCount")
     countRef.on("value",data=>{
         playerCount=data.val()
     })
    }

    updateCount(count){
database.ref("/").update({
    playerCount:count
})
    }

    update(){
        var playerVal="players/player"+this.index
        database.ref(playerVal).update({
            positionX:this.positionX,
            positionY:this.positionY
        })
    }

    addPlayersInfo(){
       var playerVal="players/player"+this.index
database.ref(playerVal).set({
    name:this.name,
    positionX:this.positionX,
    positionY:this.positionY
})
    }

    static getPlayersInfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data => {
          allPlayers = data.val();
        });
      }
}
