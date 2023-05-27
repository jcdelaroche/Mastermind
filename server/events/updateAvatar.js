const fs = require('fs');

module.exports = {
    exec: (socket, { room_id, direction, host }) => {

        const Rooms = socket.getRooms();

        if(!Rooms.has(room_id)) return socket.return({ status: 'notFound' });
        const room = Rooms.get(room_id);

        const player = host ? room.host : room.player;

        const files = fs.readdirSync(__dirname + '/../assets/avatars');
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

        return room.sendUpdate();

    }
}