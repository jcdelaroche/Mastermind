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
    res.sendFile(__dirname + `/assets/avatars/${req.params.asset}`, () => {
    });
});


// const Rooms = new Map();
// const Players = new Map();

const Rooms = new Map();
const Players = new Map();

const events = fs.readdirSync(__dirname + '/events').map((file) => file.replace('.js', ''));

io.on('connection', (socket) => {

    socket.rooms = Rooms;
    socket.players = Players;

    socket.createRoom = (player, settings) => {

        Rooms.forEach(room => {
            if(room.hasPlayer(player)) room.leave(player);
            if(room.host.id === player) Rooms.delete(room.id);
        })

        let room_id = Identifier();
        
        while(socket.rooms.has(room_id)){
            room_id = Identifier();
        }

        const room = new Room({ player, id: room_id, settings });

        room.sendToHost = (event, payload) => {
            console.log("sendToHost");
            io.to(room.host.socket).emit(event, payload);
        }

        room.sendToPlayer = (event, payload) => {
            io.to(room.player.socket).emit(event, payload);
        }

        room.send = (event, payload) => {
            io.to(room.host.socket).emit(event, payload);
            if(room.player != null){
                io.to(room.player.socket).emit(event, payload);
            }
        }

        room.sendUpdate = () => {
            io.to(room.host.socket).emit('roomUpdated', room);
            if(room.player != null){
                io.to(room.player.socket).emit('roomUpdated', room);
            }
        }

        Rooms.set(room_id, room);

        return room;
    }

    socket.getRoomOfPlayer = (player) => {
        let room = null;
        Rooms.forEach(r => {
            if(r.hasPlayer(player)) room = r;
        })
        return room;
    }

    socket.getRooms = () => Rooms;
    socket.getPlayers = () => Players;

    events.forEach(eventName => {
        let event = require(__dirname + `/events/${eventName}.js`);
        socket.on(eventName, ({ id, payload }) => {
            socket.return = (response) => io.to(socket.id).emit(`response-${id}`, response);
            event.exec(socket, payload)
        })
    })

})

server.listen(3001, () => {
    console.log('listening on *:3001');
})