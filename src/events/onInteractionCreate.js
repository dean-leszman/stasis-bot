const { channelMention } = require('@discordjs/builders');
const { BOTCOMMANDS: botCommandChannels, DEV: devChannels } = require('../data/Config');

function canUseCommandInChannel(interaction, command) {
    if (typeof command.channels === 'undefined' || !command.channels instanceof Array) return true; // not restricted

    let channelName;
    if (interaction.channel.isThread()) {
        channelName = interaction.channel.parent.name
    } else {
        channelName = interaction.channel.name;
    }

    return devChannels.includes(channelName) || botCommandChannels.includes(channelName) || command.channels.includes(channelName);
}

function checkPermissions(interaction, command) {
    // Check permissions
    if (typeof command.permissions !== 'undefined' && command.permissions instanceof Object) { // Does this command have permissions?
        const memberPermissions = interaction.memberPermissions;
        
        if (command.permissions.command !== 'undefined' && command.permissions.command instanceof Array) { // Are there permissions for the command itself?
            // Handle command permissions
            const requiredPermissions = command.permissions.command;
            if (!memberPermissions.has(requiredPermissions)) return false;
        }

        const subcommand = interaction.options._subcommand !== null ? interaction.options.getSubcommand() : null;
        if (subcommand && command.permissions.subcommands && command.permissions.subcommands instanceof Object) { // Do any subcommands have permissions?
            if (command.permissions.subcommands[subcommand] !== 'undefined' && command.permissions.subcommands[subcommand] instanceof Array) { // Are there permissions for this subcommand?
                // Handle subcommand permissions
                const requiredPermissions = command.permissions.subcommands[subcommand];
                if (!memberPermissions.has(requiredPermissions)) return false;
            }
        }
    }

    return true;
}

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.user.bot) {
            return false; // do not allow bots
        }

        let command;

        if (interaction.isCommand()) {
            command = interaction.client.commands.get(interaction.commandName);
        } else if (interaction.isContextMenu()) {
            command = interaction.client.contexts.get(interaction.commandName);
        } else if (interaction.isButton()) {
            command = interaction.client.buttons.get(interaction.commandName);
        }

        if (!command) return; // the command does not exist

        try {
            const authorised = checkPermissions(interaction, command);
            if (!authorised) {
                await interaction.reply({
                    content: `You are not authorised to use this command.`,
                    ephemeral: true
                });
                return;
            }

            const canUseInChannel = canUseCommandInChannel(interaction, command);
            if (!canUseInChannel) {
                const commandChannels = interaction.guild.channels.cache.filter(x => command.channels.includes(x.name)); // channels for this command
                const globalChannels = interaction.guild.channels.cache.filter(x => botCommandChannels.includes(x.name)); // bot command channels
                const allowedChannels = commandChannels.concat(globalChannels);
                const channelMentions = allowedChannels.map(channel => channelMention(channel.id));

                await interaction.reply({
                    content: `You can not use that command in this channel. Please keep usage to the following channels:\n${channelMentions}.`,
                    ephemeral: true
                });
                return;
            }

            console.log(`${interaction.member.displayName} (${interaction.member.user.tag}) used '${interaction.commandName}'`);
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command.',
                ephemeral: true
            });
        }
    }
};