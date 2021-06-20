const Settings = require('../settings.json');

function command(message) {

    // Toggle Counter Game
    if (message.content == `${Settings.commandPrefix}toggleCounterGame`) {
        Settings.counterGame.enabled = !Settings.counterGame.enabled;
    }
}

module.exports = { command };