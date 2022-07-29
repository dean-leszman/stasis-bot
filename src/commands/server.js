const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { channelMention } = require('@discordjs/builders');
const { rules, textChannelsCategory } = require('../data/Config');
const { colors } = require('../data/Static');

function getRulesEmbed() {
    let description = '';

    rules.forEach(rule => {
        description += `**${rule.name}**\n${rule.value}\n\n`;
    });

    return embed = new EmbedBuilder()
        .setTitle('Server Rules')
        .setDescription(description)
        .setColor(colors.teal);
}

function getTextChannelsEmbed(interaction) {
    const category = interaction.guild.channels.cache.find(channel => channel.name === textChannelsCategory);

    let description = 'The channels listed below are restricted to those with the matching role.\nTo view the channel, you must obtain the matching role via \`/role`.\n\n';

    const channels = category.children.cache.sort((a, b) => a.name.localeCompare(b.name));
    channels.forEach(channel => {
        description += `${channelMention(channel.id)}\n`;
    });

    return embed = new EmbedBuilder()
        .setTitle('Text Channels')
        .setDescription(description)
        .setColor(colors.teal);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Server commands.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand => 
            subcommand.setName('rules')
            .setDescription('Create the rules embed.')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('textchannels')
            .setDescription('Create the text channels embed.')
        ),
    async execute(interaction) {
        let embed;
        switch (interaction.options.getSubcommand()) {
            case 'rules': {
                embed = getRulesEmbed();
                break;
            }
            case 'textchannels': {
                embed = getTextChannelsEmbed(interaction);
                break;
            }
            default: {
                break;
            }
        }

        interaction.channel.send({
            embeds: [embed]
        });

        interaction.reply({
            content: 'Success!',
            ephemeral: true
        });
    },
    channels: ["server-info"]
}