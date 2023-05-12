const fs = require('fs');

 function RandomAvatar() {

    // get alls files in assets folder
    const files = fs.readdirSync(__dirname + '/../assets/avatars');

    return `http://localhost:3001/assets/avatars/${files[Math.floor(Math.random() * files.length)]}`;

}

module.exports = {
    RandomAvatar
}