const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const MAX_SIZE = 10;

module.exports = class BubbleWrapCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bubblewrap',
            aliases: ['pop'],
            group: 'misc',
            memberName: 'bubblewrap',
            description: 'Misc server commands',
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'size',
                prompt: 'Please enter the size of grid (max 10)',
                type: 'integer',
                default: 5,
                validate: size => {
                    const valid = size > 0 && size <= 10;
                    if (valid) return true;

                    return "Size must be between 1 and 10.";
                }
            }]
        });
    }

    run(message, { size }) {
        let embed = new MessageEmbed()
            .setTitle("**Once you pop, you can't stop!**")
            .setColor(0x000000);

        let response = "";
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                response += "||pop||";
            }
            response += "\n";
        }
        embed.setDescription(embed);

        message.embed(embed);

        message.delete();

        return response;
    }
}