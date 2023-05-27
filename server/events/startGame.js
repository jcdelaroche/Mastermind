module.exports = {

    exec: (socket, payload) => {

        console.log(payload);

        const Rooms = socket.getRooms();

        if(!Rooms.has(payload)) return socket.return({ status: 'notFound' });
        const room = Rooms.get(payload);

        if(room.host.socket === socket.id) {
            return room.send('gameStarting', { status: "success", room });
            if(room.player != null) io.to(room.player.socket).emit('gameStarting', { status: "success", room })
            return io.to(socket.id).emit('gameStarting', { status: "success", room });
        }
    }

}