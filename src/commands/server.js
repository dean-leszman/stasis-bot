const { MessageEmbed } = require('discord.js');
const { channelMention, SlashCommandBuilder } = require('@discordjs/builders');
const { RULES: rules, TEXTCHANNELS: textChannels } = require('../data/Config');
const { COLORS: colors, PERMISSIONS: permissions } = require('../data/Static');

function getRulesEmbed() {
    let description = '';

    rules.forEach(rule => {
        description += `**${rule.name}**\n${rule.value}\n\n`;
    });

    return embed = new MessageEmbed()
        .setTitle('Server Rules')
        .setDescription(description)
        .setColor(colors.teal);
}

function getTextChannelsEmbed() {
    let description = 'The channels listed below are restricted to those with the matching role.\nTo view the channel, you must obtain the matching role via \`/role`.\n\n';

    textChannels.forEach(channel => {
        description += `${channelMention(channel)}\n`;
    });

    return embed = new MessageEmbed()
        .setTitle('Text Channels')
        .setDescription(description)
        .setColor(colors.teal);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Server commands.')
        .addSubcommand(subcommand => 
            subcommand.setName('rules')
            .setDescription('Create the rules embed.')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('textchannels')
            .setDescription('Create the text channels embed.')
        ),
    permissions: {
        commands: [permissions.ADMINISTRATOR]
    },
    async execute(interaction) {
        let embed;
        switch (interaction.options.getSubcommand()) {
            case 'rules': {
                embed = getRulesEmbed();
                break;
            }
            case 'textchannels': {
                embed = getTextChannelsEmbed();
                break;
            }
            default: {
                break;
            }
        }

        interaction.reply({
            embeds: [embed]
        });
    }
}