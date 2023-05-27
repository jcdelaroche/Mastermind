const Player = require("../Class/Player");

module.exports = {
    exec: (socket, payload) => {

        const Rooms = socket.getRooms();

        if(!Rooms.has(payload)) return socket.return({ status: 'notFound' })

        const room = Rooms.get(payload);

        if(room.player != null) return socket.return({ status: 'full' })

        room.join(new Player(socket.id));

        room.sendToHost('roomUpdated', room);
        socket.return({ status: 'success', room: room })

        // io.to(room.host.socket).emit('roomUpdated', room);
        // return io.to(socket.id).emit('joinRoomResponse', { status: 'success', room: room });
    }
}