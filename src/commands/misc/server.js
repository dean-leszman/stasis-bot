const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

function getRulesEmbed() {
    let embed = new MessageEmbed()
    .setTitle("**Server Rules**")
    .addFields([{
        name: "**Use Common Sense**",
        value: "The server staff aren't here to babysit you. Keep it sensible."
    }, {
        name: "**Spamming**",
        value: "Don't spam: chat, emojis, caps, etc."
    }, {
        name: "**Advertising**",
        value: "Have your own server? Fantastic! We don't want to know about it here. If you want an exception to this, ask a staff member."
    }, {
        name: "**Nicknames & Avatars**",
        value: "Please keep your name / avatar sensible. If it's inappropriate, you will be kicked."
    }, {
        name: "**English Only**",
        value: "Whilst we appreciate the community is made up of members from a multitude of countries, please keep chat to English."
    }, {
        name: "**Immigration Control**",
        value: "All traffic through the border must present a valid citizen identity card or visa permit."
    }]);
    
    embed.setColor(0x1ABC9C);

    return embed;
}

function getTextChannelsEmbed() {
    let channelIds = [
        "662409576380891146", // Arma 3
        "808380003951575060", // Eco
        "791662222082310175", // Escape From Tarkov
        "447047848652177408", // Final Fantasy
        "619493278164975618", // Path of Exile
    ];

    let channelMessage = "";
    channelIds.map(x => {
        channelMessage += `\n<#${x}>`;
    })

    let embed = new MessageEmbed()
    .setTitle("**Text Channels**")
    .setDescription("The channels listed below are restricted to those with the matching role. To view the channel, you must obtain the matching role in <#398142545793908737>.\n" + channelMessage);  // arma 3
    
    embed.setColor(0x1ABC9C);

    return embed;
}

module.exports = class ServerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'server',
            group: 'misc',
            memberName: 'server',
            description: 'Misc server commands',
            userPermissions: ['MANAGE_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'category',
                prompt: 'Please enter a sub-command: `rules | textchannels | folding`',
                type: 'string',
                default: ''
            }]
        });
    }

    run(message, { category }) {
        let response;
        switch (category.toUpperCase()) {
            case "RULES":
                response = message.embed(getRulesEmbed());
                break;
            case "TEXTCHANNELS":
                response = message.embed(getTextChannelsEmbed());
                break;
            default:
                response = message.say("I didn't understand that. ")
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000);
                    })
                    .catch(err => {
                        console.error(err);
                    });

                break;
        }

        message.delete();

        return response;
    }
}