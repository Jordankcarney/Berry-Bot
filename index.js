// DEPENDANCIES & LIBRARIES 
const Discord = require('discord.js');
var client = new Discord.Client();

const Settings = require('./settings.json');
const Commands = require('./modules/commands.js');

// INITIATE DISCORD CLIENT

// Log the bot in
client.login(Settings.botToken);

// Bot loop
client.once('ready', async () => {

    // Log command to console when ready
	console.log('Bot engaged, ready for action!');

    // Monitor channels for commands
    client.on('message', message => {

        // Ignore self
        if(message.author.username !== Settings.botName) {

            // Listen for command
            if(message.content.split('')[0] === Settings.commandPrefix) {
                Commands.command(message);
            }
        }
    });

    // If module is not enable, don't bother loading it.
    if(Settings.counterGame.enabled === true) {
        var CounterGame = require('./modules/counterGame.js');
        console.log('Counter Game Enabled!');

        // Call the game function
        client.on('message', message => {
            CounterGame.counterGame(client, message);

        });
    }

});