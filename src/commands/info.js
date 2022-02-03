const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { colors } = require('../data/Static');
const { getBoostTier } = require('../util');

function showServerInfo(interaction) {
    const server = interaction.guild;

    const embed = new MessageEmbed()
        .setTitle(server.name)
        .setDescription(
            `**Created:** ${server.createdAt.toLocaleDateString('en-GB')}\n` +
            `**Total Members:** ${server.memberCount}\n` +
            `**Boost Level:** ${getBoostTier(server.premiumTier)} (${server.premiumSubscriptionCount} boosts)\n`
        )
        .setThumbnail(server.iconURL())
        .setColor(colors.teal);

    interaction.reply({
        embeds: [embed]
    });
}

function showUserInfo(interaction) {
    const user = interaction.options.getUser('user');
    const guildMember = interaction.guild.members.cache.find(member => member.id === user.id);

    const name = guildMember.nickname ? guildMember.nickname : guildMember.user.username;
    const embed = new MessageEmbed()
        .setTitle(name)
        .setDescription(
            `**ID:** ${guildMember.id}\n` +
            `**Username:** ${guildMember.user.username}#${guildMember.user.discriminator}\n` +
            `**Joined:** ${guildMember.joinedAt.toLocaleDateString('en-GB')}`
        )
        .setThumbnail(user.avatarURL())
        .setColor(colors.teal);

    interaction.reply({
        embeds: [embed]
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('View information about the server or a user.')
        .addSubcommand(subcommand =>
            subcommand.setName('server')
            .setDescription('View information about the server.')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('user')
            .setDescription('View information about a user.')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('The user that you want to view information about.')
                .setRequired(true)
            )
        ),
    async execute(interaction) {
        switch(interaction.options.getSubcommand()) {
            case 'server': {
                showServerInfo(interaction);
                break;
            }
            case 'user': {
                showUserInfo(interaction);
                break;
            }
            default: {
                break;
            }
        }
    },
    channels: ["bot-commands"]
};