const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class StasisCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stasis',
            group: 'util',
            memberName: 'commands',
            description: 'Get a list of commands'
        });
    }

    run(message) {
        const embed = new MessageEmbed()
        .setTitle("**Commands**")
        .setDescription("**Games**\n" +
            "`!arma` - ARMA 3\n" +
            "`!destiny` - Destiny\n" +
            "`!eft` - Escape From Tarkov\n\n" +
            "**Miscellaneous**\n" +
            "`!papers` - Papers, please responses\n" +
            "`!rekt` - Rekt\n\n" +
            "**Utility**\n" +
            "`!poll` - Create a poll\n!" + 
            "`!role` - Get roles\n" +
            "`!server` - Admin-related commands\n"
        )
        .setColor(0x48C9B0);

        return message.embed(embed);
    }
}