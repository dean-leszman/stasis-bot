const { Command } = require('discord.js-commando');

module.exports = class ImageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'image',
            group: 'util',
            memberName: 'image',
            description: 'Post an image',
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'url',
                prompt: 'Plase enter an image URL',
                type: 'string',
                default: ''
            }]
        });
    }

    run(message, { url }) {
        message.say("", {
            files: [url]
        })
        .then(() => {
            message.delete()
            .catch(console.error);
        })
        .catch(console.error);
    }
}