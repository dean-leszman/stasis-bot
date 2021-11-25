const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('test'),
    async execute(interaction) {
        interaction.reply({ content: 'To do.' });
    }
}