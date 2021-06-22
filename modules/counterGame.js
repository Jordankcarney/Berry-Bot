const Settings = require('../settings.json');

// Message Listener Event Loops
function counterGame(client, message) {

    function fail() {

        // If delete setting enabled, deletes up to 100 messages at a time
        if(Settings.counterGame.deleteMessages === true) {
            for(let i = Math.ceil(Settings.counterGame.progress / 100); i >= 0; i--) {
                message.channel.bulkDelete(100);
            }
         }

        message.channel.send(Settings.counterGame.resetMessage);
        Settings.counterGame.progress = 0;
    }    

    function victory() {

        switch(Settings.counterGame.onVicotry) {
            // Send victory message, continue working.
            case 'highScore':
                message.channel.send(Settings.counterGame.victoryMessage);
                break;

            // Allows people to talk but game is no longer being recorded
            case 'endGame':
                message.channel.send(Settings.counterGame.victoryMessage);
                Settings.counterGame.enabled = false; 
                break; 

            // Turns off permission for @everyone to chat in the game room and stops recording the game.
            case 'closeChat':
                message.channel.send(Settings.counterGame.victoryMessage);
                Settings.counterGame.enabled = false;  
                // TODO: CLOSE CHANNEL PERMS
        }
    }
    
    // Game Loop
        if(Settings.counterGame.enabled === true) {
    
            // Check channel ID to see if match counter ID game setting.
            if(message.channel.id === Settings.counterGame.channelID) {
    
                // Read messages only if posting user does not have the bot role.
                if(!message.member.roles.cache.some(r => [`${Settings.botName}`].includes(r.name))) {
                    const splitMessage = message.content.split(' ');
    
                    // Initiate fail sequence if first word is not a number
                    if (isNaN(splitMessage[0])) {
                        fail();
                    }
    
                    // Else continue the game
                    else {
    
                        // If message is in sequcence, increase progress.
                        if(parseInt(splitMessage[0]) == Settings.counterGame.progress + 1) {
                            Settings.counterGame.progress++;
                            console.log(Settings.counterGame.progress);
                        }
    
                        // Else initiate fail sequence
                        else {

                            fail();
                            
                        }
                    }

                    // Set bot activity to current count to easily keep track of it.
                    client.user.setActivity(Settings.counterGame.progress.toString());

                    if(Settings.counterGame.progress === Settings.counterGame.goal) {
                        victory();
                    }
                }
            }
        }

}


module.exports = { counterGame };