const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin.'),
    async execute(interaction) {
        interaction.reply({
            content: +new Date() % 2 === 0 ? "Heads!": "Tails!"
        });
    },
    channels: ["bot-commands"]
}