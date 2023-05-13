const express = require('express')
const app = express()
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const Identifier = require('./Functions/Identifier');
const Room = require('./Class/Room');
const Player = require('./Class/Player');
const fs = require('fs');

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
});

app.get('/assets/avatars/:asset', (req, res) => {
    // if file exists, send file
    res.sendFile(__dirname + `/assets/avatars/${req.params.asset}`, () => {
        // res.status(404).send('Not found');
    });
});

const Rooms = new Map();
const Players = new Map();

io.on('connection', (socket) => {

    socket.on('checkRoom', (room_id) => {
        console.log(room_id);
        return io.to(socket.id).emit('checkRoomResponse', { status: (Rooms.has(room_id)) ? 200 : 404 });
    })

    socket.on('createRoom', (settings) => {
        const player = new Player(socket.id);
        Players.set(player.id, player)
        io.to(socket.id).emit('roomCreated', { player: player, room: createRoom(player, settings) })
    });

    socket.on('joinRoom', (room_id) => {
        if(!Rooms.has(room_id)) return io.to(socket.id).emit('joinRoomResponse', { status: 'notFound' });
        const room = Rooms.get(room_id);
        if(room.player != null) return io.to(socket.id).emit('joinRoomResponse', { status: 'full' });
        room.join(new Player(socket.id));
        console.log(room);
        io.to(room.host.socket).emit('roomUpdated', room);
        return io.to(socket.id).emit('joinRoomResponse', { status: 'success', room: room });
    });

    socket.on('updatePlayer', (id) => {
        if(!Players.has(id)) return io.to(socket.id).emit('updatePlayerResponse', { status: 'notFound' });
        const player = Players.get(id);
        player.socket = socket.id;
        return io.to(socket.id).emit('updatePlayerResponse', { status: 'success', player: player });
    })

    socket.on('updateAvatar', ({ room_id, direction, host }) => {

        if(!Rooms.has(room_id)) return io.to(socket.id).emit('updateAvatarResponse', { status: 'notFound' });
        const room = Rooms.get(room_id);

        const player = host ? room.host : room.player;

        const files = fs.readdirSync(__dirname + '/assets/avatars');
        const avatar = player.avatar.split('/')[player.avatar.split('/').length - 1];

        let avatarNumber = parseInt(avatar.split('.')[0]);

        switch(direction){
            case "previous":
                if(avatarNumber === 1) avatarNumber = files.length;
                else avatarNumber--;
                player.avatar = `http://localhost:3001/assets/avatars/${(avatarNumber <= 9) ? `0${avatarNumber}` : avatarNumber}.png`;
                break;
            case "next":
                if(avatarNumber === files.length) avatarNumber = 1;
                else avatarNumber++;
                player.avatar = `http://localhost:3001/assets/avatars/${(avatarNumber <= 9) ? `0${avatarNumber}` : avatarNumber}.png`;
                break;
        }

        if(room.player != null) io.to(room.player.socket).emit('roomUpdated', room);
        return io.to(room.host.socket).emit('roomUpdated', room);

        
    })

    socket.on('startGame', (room_id) => {
        if(!Rooms.has(room_id)) return io.to(socket.id).emit('leaveRoomResponse', { status: 'notFound' });
        const room = Rooms.get(room_id);

        if(room.host.socket === socket.id) {
            if(room.player != null) io.to(room.player.socket).emit('gameStarting', { status: "success", room })
            return io.to(socket.id).emit('gameStarting', { status: "success", room });
        }
    })

    socket.on('leaveRoom', (room_id) => {
        if(!Rooms.has(room_id)) return io.to(socket.id).emit('leaveRoomResponse', { status: 'notFound' });
        const room = Rooms.get(room_id);

        if(room.host.socket === socket.id) {
            if(room.player != null) io.to(room.player.socket).emit('roomDeleted', { status: 'success' })
            Rooms.delete(room.id);
            return io.to(socket.id).emit('leaveRoomResponse', { status: 'success' });
        }

        if(room.player != null) {
            if(room.player.socket === socket.id){
                room.leave(room.player);
                return io.to(room.host.socket).emit('roomUpdated', room);
            }
        }
    })

    socket.on('disconnect', () => {
        Rooms.forEach(room => {
            if(room.host.socket === socket.id){
                if(room.player != null) io.to(room.player.socket).emit('roomDeleted', { status: 'success' })
                Rooms.delete(room.id);
                return;
            }
            if(room.player != null) {
                if(room.player.socket === socket.id){
                    room.leave(room.player);
                    return io.to(room.host.socket).emit('roomUpdated', room);
                }
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
    return room;
}

server.listen(3001, () => {
    console.log('listening on *:3001');
})