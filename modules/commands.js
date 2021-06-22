const Settings = require('../settings.json');

function command(message) {

    // Toggle Counter Game
    if (message.content == `${Settings.commandPrefix}toggleCounterGame`) {
        Settings.counterGame.enabled = !Settings.counterGame.enabled;
    }

    if (message.content == `${Settings.commandPrefix}setProg200`) {
        Settings.counterGame.progress = 200;
    }


}

module.exports = { command };