const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const { getBaseEmbed } = require("../../util");
const { RULES, TEXTCHANNELS } = require("../../data/Stasis/Server");

function getRulesEmbed() {
    return getBaseEmbed()
        .setTitle("**Server Rules**")
        .addFields(RULES);
}

function getTextChannelsEmbed() {
    let channelMessage = "";
    TEXTCHANNELS.forEach(x => {
        channelMessage += `\n<#${x}>`;
    })

    return getBaseEmbed()
        .setTitle("**Text Channels**")
        .setDescription("The channels listed below are restricted to those with the matching role. To view the channel, you must obtain the matching role in <#398142545793908737>.\n" + channelMessage);
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