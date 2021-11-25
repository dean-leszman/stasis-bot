const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coin')
        .setDescription('Flip a coin.'),
    async execute(interaction) {
        interaction.reply({
            content: +new Date() % 2 === 0 ? "Heads!": "Tails!"
        });
    }
}