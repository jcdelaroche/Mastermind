module.exports = {

    exec: (socket, payload) => {

        const Rooms = socket.getRooms();

        Rooms.forEach(room => {
            if(room.host.socket === socket.id){
                if(room.player === null) return Rooms.delete(room.id);
                room.host = room.player;
                room.player = null;
                return room.sendUpdate();
            }
            if(room.player != null) {
                if(room.player.socket === socket.id){
                    console.log("player left room");
                    room.leave(room.player);
                    return room.sendUpdate();
                }
            }
        })
    }

}