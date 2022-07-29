const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { roleMention } = require('@discordjs/builders');

const { colorRoles, iconRoles, gameRoles } = require('../data/Roles');
const { colors } = require('../data/Static');

const roleTypes = {
    all: 'all',
    colors: 'colors',
    games: 'games',
    icons: 'icons'
}

function isProtectedRole(role, roles) {
    // Admin role
    if (role.id === roles.highest.id) {
        return true;
    }

    // Nitro role
    if (role.id === roles.premiumSubscriberRole.id) {
        return true;
    }

    return false;
}

function getRoleEmbed(interaction, type) {
    const embed = new EmbedBuilder().setColor(colors.teal);

    let roles;
    switch (type) {
        case roleTypes.colors: {
            embed.setTitle('**Color Roles**');
            roles = colorRoles;
            break;
        }
        case roleTypes.games: {
            embed.setTitle('**Game Roles**');
            roles = gameRoles;
            break;
        }
        case roleTypes.icons: {
            embed.setTitle('**Icon Roles**');
            roles = iconRoles;
            break;
        }
    }

    const guildRoles = interaction.guild.roles.cache.filter(x => roles.includes(x.name)).sort((a, b) => a.name.localeCompare(b.name));

    let description = '';
    guildRoles.forEach(role => {
        description += `${roleMention(role.id)}\n`;
    });

    embed.setDescription(description);

    return embed;
}

async function handleJoinRole(interaction) {
    // Add role to user
    await interaction.deferReply();

    const role = interaction.options.getRole('role');

    const protectedRole = isProtectedRole(role, interaction.guild.roles);
    if (protectedRole) {
        interaction.editReply({
            content: `You cannot join the ${role.name} role!`
        });

        return;
    }

    const canJoin = colorRoles.some(x => x === role.name) || gameRoles.some(x => x === role.name) || iconRoles.some(x => x === role.name);
    if (!canJoin) {
        await interaction.editReply({
            content: `You are not allowed to join the ${role.name} role.`
        });

        return;
    }

    const memberHasRole = interaction.member.roles.cache.find(x => x.name === role.name);
    if (memberHasRole) {
        await interaction.editReply({
            content: `You already have the ${role.name} role!`
        });

        return;
    }
    
    await interaction.member.roles.add(role.id)
    await interaction.editReply({
        content: `You have been added to the ${role.name} role.`
    });
}

async function handleLeaveRole(interaction) {
    // Remove role from user
    await interaction.deferReply();

    const role = interaction.options.getRole('role');

    const protectedRole = isProtectedRole(role, interaction.guild.roles);
    if (protectedRole) {
        interaction.editReply({
            content: `You cannot leave the ${role.name} role!`
        });

        return;
    }

    const memberHasRole = interaction.member.roles.cache.find(x => x.id === role.id);
    if (!memberHasRole) {
        interaction.editReply({
            content: `You don\'t have the ${role.name} role!`
        });

        return;
    }
    
    await interaction.member.roles.remove(role.id)
    interaction.editReply({
        content: `You have been removed from the ${role.name} role.`
    });
}

function handleViewHelp(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('Role Help')
        .addFields({ 
            name: 'View role help - `/role help`', 
            value: 'You know how to do this already. Good job!' 
        }, { 
            name: 'View available roles - `/role list <all|colors|icons|games>`', 
            value: 'e.g. `/role list games`' 
        }, {
            name: 'Join a role - `/role join <Role Name>`', 
            value: 'e.g. `/role join Escape From Tarkov`'
        }, { 
            name: 'Leave a role - `/role leave <Role Name>`', 
            value: 'e.g. `/role leave Path of Exile`'
        })
        .setColor(colors.teal);

    interaction.reply({
        embeds: [embed]
    });
}

function handleViewRoles(interaction) {
    const type = interaction.options.getString('type');

    let embeds = [];
    if (type === roleTypes.all) {
        const types = Object.keys(roleTypes).filter(x => x !== roleTypes.all);
        types.forEach(t => embeds.push(getRoleEmbed(interaction, t)));
    } else {
        embeds.push(getRoleEmbed(interaction, type));
    }

    interaction.reply({
        embeds: embeds
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Manage your roles.')
        .addSubcommand(subcommand =>
            subcommand.setName('help')
            .setDescription('Help! I don\'t know what to do!')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('join')
            .setDescription('Join a role.')
            .addRoleOption(option => 
                option.setName('role')
                .setDescription('The role you want to join')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('leave')
            .setDescription('Leave a role.')
            .addRoleOption(option => 
                option.setName('role')
                .setDescription('The role you want to leave')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('list')
            .setDescription('List available roles.')
            .addStringOption(option =>
                option.setName('type')
                .setDescription('Type of roles to view.')
                .addChoices(
                    { name: roleTypes.all, value: roleTypes.all },
                    { name: roleTypes.colors, value: roleTypes.colors },
                    { name: roleTypes.icons, value: roleTypes.icons },
                    { name: roleTypes.games, value: roleTypes.games }
                )
                .setRequired(true)
            )
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'help': {
                handleViewHelp(interaction);
                break;
            }
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
    },
    channels: ["bot-commands"]
}