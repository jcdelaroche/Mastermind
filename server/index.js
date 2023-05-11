const express = require('express')
const app = express()
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const Identifier = require('./Functions/Identifier');
const Room = require('./Class/Room');

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
});

const Rooms = new Map();

io.on('connection', (socket) => {

    console.log('User connected : ' + socket.id);

    socket.on('createRoom', (settings) => {
        io.to(socket.id).emit('roomCreated', createRoom(socket.id, settings))
    });

    socket.on('joinRoom', (room_id) => {

        console.log("Connexion à la room " + socket.id);
    
        if(!Rooms.has(room_id)) return io.to(socket.id).emit('joinRoomResponse', { status: 'notFound' });
        const room = Rooms.get(room_id);
        
        if(room.host.id === socket.id) return io.to(socket.id).emit('joinRoomResponse', { status: 'host' });
        if(room.player.id != null) return io.to(socket.id).emit('joinRoomResponse', { status: 'full' });

        room.join(socket.id);

        return io.to(socket.id).emit('joinRoomResponse', { status: 'success', room: room });
    
    });

    socket.on('disconnect', () => {

        console.log('User disconnect : ' + socket.id);

        Rooms.forEach((room, room_id) => {

            if(room.host.id === socket.id) {
                Rooms.delete(room.id)
            }

        })

    })

})



const createRoom = (player, settings) => {

    Rooms.forEach(room => {
        if(room.hasPlayer(player)) room.leave(player);
        if(room.host.id === player) Rooms.delete(room.id);
    })

    let room_id = Identifier();
    while(Rooms.has(room_id)){
        room_id = Identifier();
    }

    const room = new Room({ player, id: room_id, settings });
    Rooms.set(room_id, room);

    return room.id;
}

server.listen(3001, () => {
    console.log('listening on *:3001');
})