require('dotenv').config();

const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./config.json');
const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: config.owner,
    unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['games', 'Games'],
        ['misc', 'Miscellaneous'],
        ['util', 'Utilities']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        unknownCommand: false
    })
    .registerCommandsIn(path.join(__dirname, 'src/commands'))

/**************************************************
    Events
**************************************************/
// const onMessage = require('./src/events/onMessage');
const onVoiceStateUpdate = require('./src/events/onVoiceStateUpdate');

client.on('error', console.error);
// client.on('message', (message) => { onMessage(client, message); });
client.on('voiceStateUpdate', (oldState, newState) => { onVoiceStateUpdate(oldState, newState); });

client.once('ready', () => { require('./src/events/onceReady')(client); });

/**************************************************
    Login to Discord
**************************************************/
client.login(process.env.DISCORD_TOKEN);


/* happy birthday Alice :D */
client.on('message', message => {
    if (message.author.id === 187669174422732803) {
        message.channel.send("Happy birthday Alice!");
    }
})