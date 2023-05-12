module.exports = class Room {

    constructor({ player, id, settings }){
        this.id = id;
        this.settings = settings;
        this.player = null
        this.host = player
        this.messages = [];
    }

    hasPlayer(player){
        return ((this.player != null && this.player === player) || this.host === player)
    }

    join(player){
        if(this.player != null) return false;
        this.player = player;
    }

    leave(player){
        if(this.player === player) this.player = null;
    }

    addMessage(message){
        this.messages.push(message);
    }
    
    getMessages(){
        return this.messages;
    }

}