module.exports = class Room {

    constructor({ player, id, settings }){
        this.id = id;
        this.settings = settings;
        this.player = {
            id: null,
            username: `Guest#${Math.floor(Math.random() * 1000)}`
        }
        this.host = {
            id: player,
            username: `Guest#${Math.floor(Math.random() * 1000)}`
        }
    }

    hasPlayer(player){
        return (this.player.id === player || this.host.id === player)
    }

    join(player){
        if(this.player.id != null) return false;
        this.player.id = player;
    }

    leave(player){
        if(this.player.id === player) this.player.id = null;
    }

}