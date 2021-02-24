const { Command } = require('discord.js-commando');

module.exports = class VisaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'papers',
            aliases: ['papersplease'],
            group: 'misc',
            memberName: 'papers',
            description: 'Papers, please.',
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'type',
                prompt: 'Please enter a sub-command: `granted | denied | citation | detain`',
                type: 'string',
                oneOf: ['granted', 'denied', 'citation', 'detain']
            }]
        });
    }

    run(message, { type }) {
        message.delete();
        switch (type.toUpperCase()) {
            case "GRANTED":
                return message.say('https://i.imgur.com/5GJzJdu.png');
            case "DENIED":
                return message.say('https://i.imgur.com/2lKt16i.png');
            case "CITATION":
                return message.say('https://media.tenor.com/images/29bd83a5e16f966b561b309c595524af/tenor.gif');
            case "DETAIN":
                return message.say('https://i.kym-cdn.com/photos/images/original/001/908/670/270.gif');
        }
    }
}