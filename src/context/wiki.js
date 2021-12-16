const { ApplicationCommandType } = require('discord-api-types/v9');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("Wikipedia Search")
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const message = interaction.options.getMessage('message');

        await interaction.reply({
            content: `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(message.content)}`
        });
    }
}