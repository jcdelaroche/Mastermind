module.exports = {
    exec: (socket, payload) => {
        if(!socket.getPlayers().has(payload)) return socket.return({ status: 'notFound' });
        const player = socket.getPlayers().get(payload);
        player.socket = socket.id;
        socket.return(socket.getRoomOfPlayer(player))
    }
}