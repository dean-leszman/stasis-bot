const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class UnknownCommandCommand extends Command {
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
        .setDescription("A list of commands available via Stasis Bot.")
        .addFields({
            name: "**Escape From Tarkov**",
            value: "Description: View information on Tarkov ammo types or maps.\nCommand: `!tarkov`\nAliases: `!eft`, `!escapefromtarkov`"
        }, {
            name: "**Papers, please.**",
            value: "Description: Show a Papers, please style granted/denied stamp.\nCommand: `!papers`\nAliases: `!papersplease`, `!visa`"
        }, {
            name: "**Roll**",
            value: "Description: Roll one or more dice. Supports repeated rolls, number of dice, value of dice, and modifier.\nCommand: `!roll`\nAliases: `!dice`"
        })
        .setColor(0x48C9B0);

        return message.embed(embed);
    }
}