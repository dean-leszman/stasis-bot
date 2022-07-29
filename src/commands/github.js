const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Get a link to the bot\'s Github repository.'),
    async execute(interaction) {
        await interaction.reply({
            content: 'https://github.com/dean-leszman/stasis-bot',
            ephemeral: true
        });
    },
    channels: ["bot-commands"]
}