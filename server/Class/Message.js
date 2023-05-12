const { v4: uuidv4 } = require('uuid');

module.exports = class Message {
    constructor(author, content){
        this.id = uuidv4();
        this.author = author.username;
        this.content = message;
    }
}