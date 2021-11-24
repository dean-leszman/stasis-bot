const { MessageEmbed } = require('discord.js');
const { roleMention, SlashCommandBuilder } = require('@discordjs/builders');

const { trimString } = require('../util');

const { COLORS: colorRoles, ICONS: iconRoles, GAMES: gameRoles } = require('../data/Roles');
const { COLORS: colors } = require('../data/Static');

const command = new SlashCommandBuilder()
    .setName('role')
    .setDescription('Join or leave roles')
    .addSubcommand(subcommand =>
        subcommand.setName('join')
        .setDescription('Join a role')
        .addStringOption(option =>
            option.setName('role_name')
            .setDescription('Role name')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName('leave')
        .setDescription('Leave a role')
        .addStringOption(option =>
            option.setName('role_name')
            .setDescription('Role name')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName('list')
        .setDescription('List available roles')
        .addStringOption(option =>
            option.setName('type')
            .setDescription('Type of roles to list')
            .addChoice('all', 'ALL')
            .addChoice('colors', 'COLORS')
            .addChoice('icons', 'ICONS')
            .addChoice('games', 'GAMES')
            .setRequired(true)
        )
    );

function getRoleEmbed(type) {
    const embed = new MessageEmbed()
        .setColor(colors.teal);
    
    let roles;
    switch (type) {
        case 'COLORS': {
            embed.setTitle('**Color Roles**');
            roles = colorRoles;
            break;
        }
        case 'GAMES': {
            embed.setTitle('**Game Roles**');
            roles = gameRoles;
            break;
        }
        case 'ICONS': {
            embed.setTitle('**Icon Roles**');
            roles = iconRoles;
            break;
        }
    }

    let description = '';
    roles.forEach(role => {
        description += `${roleMention(role.id)}\n`;
    });

    embed.setDescription(description);

    return embed;
}

async function handleJoinRole(interaction) {
    // Add role to user
    await interaction.deferReply();

    const roleName = interaction.options.getString('role_name');
    const guildRole = interaction.guild.roles.cache.find(role => role.name.toUpperCase() === roleName.toUpperCase());

    if (!guildRole) {
        interaction.editReply({
            content: `The ${trimString(roleName)} role does not exist. Try \`/role list all\` to view available roles.`
        });

        return;
    }

    const memberHasRole = interaction.member.roles.cache.find(role => role.name === guildRole.name);
    if (memberHasRole) {
        interaction.editReply({
            content: `You already have the ${guildRole.name} role!`
        });

        return;
    }
    
    await interaction.member.roles.add(guildRole.id)
    interaction.editReply({
        content: `You have been added to the ${guildRole.name} role.`
    });
}

async function handleLeaveRole(interaction) {
    // Remove role from user
    await interaction.deferReply();

    const roleName = interaction.options.getString('role_name');
    const guildRole = interaction.guild.roles.cache.find(role => role.name.toUpperCase() === roleName.toUpperCase());

    if (!guildRole) {
        interaction.editReply({
            content: `The ${trimString(roleName)} role does not exist. Try \`/role list all\` to view available roles.`
        });

        return;
    }

    const memberHasRole = interaction.member.roles.cache.find(role => role.name === guildRole.name);
    if (!memberHasRole) {
        interaction.editReply({
            content: `You don\'t have the ${guildRole.name} role!`
        });

        return;
    }
    
    await interaction.member.roles.remove(guildRole.id)
    interaction.editReply({
        content: `You have been removed from the ${guildRole.name} role.`
    });
}

function handleViewRoles(interaction) {
    const type = interaction.options.getString('type');

    let embeds = [];
    if (type === 'ALL') {
        embeds.push(getRoleEmbed('COLORS'));
        embeds.push(getRoleEmbed('GAMES'));
        embeds.push(getRoleEmbed('ICONS'));
    } else {
        embeds.push(getRoleEmbed(type));
    }

    interaction.reply({
        embeds: embeds
    });
}

module.exports = {
    data: command,
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'join': {
                handleJoinRole(interaction);
                break;
            }
            case 'leave': {
                handleLeaveRole(interaction);
                break;
            }
            case 'list':
            default: {
                handleViewRoles(interaction);
            }
        }
    }
}