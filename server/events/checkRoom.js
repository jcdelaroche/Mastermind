module.exports = {
    exec: (socket, payload) => socket.return(socket.getRooms().has(payload) ? 200 : 404)
}