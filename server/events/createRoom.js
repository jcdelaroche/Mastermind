const Player = require("../Class/Player");

module.exports = {
    exec: (socket, payload) => {
        const player = new Player(socket.id);
        const room = socket.createRoom(player, payload);

        socket.players.set(player.id, player)
        socket.return({ player, room})
    }
}