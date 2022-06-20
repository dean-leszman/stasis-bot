const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('goodbot')
        .setDescription('Good bot.'),
    async execute(interaction) {
        interaction.reply({
            content: '(◕‿◕ ✿ )'
        });
    },
}