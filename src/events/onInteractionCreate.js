const { channelMention } = require('@discordjs/builders');
const { botCommandChannels, devChannels } = require('../data/Config');

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

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.user.bot) {
            return false; // do not allow bots
        }

        let command = interaction.client.commands.get(interaction.commandName);
        if (!command) return; // the command does not exist

        try {
            const isDisabled = command.disabled === true;
            if (isDisabled) {
                await interaction.reply({
                    content: 'That command is currently disabled.',
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
            const response = {
                content: 'There was an error while executing this command.',
                ephemeral: true
            };

            await interaction.reply(response)
            .catch(() => {
                interaction.followUp(response);
            });
        }
    }
};