const { ApplicationCommandType } = require('discord-api-types/v9');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("YouTube Search")
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const message = interaction.options.getMessage('message');

        await interaction.reply({
            content: `<https://www.youtube.com/results?search_query=${encodeURIComponent(message.content)}>`
        });
    }
}