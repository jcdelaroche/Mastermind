const { v4: uuidv4 } = require('uuid');
const { RandomAvatar } = require('../Functions/Utils');

module.exports = class Player {
    constructor(socket){
        this.id = uuidv4();
        this.socket = socket;
        this.username = `Guest#${Math.floor(Math.random() * (9999 - 1000) + 1000)}`;
        this.avatar = RandomAvatar();
    }

}