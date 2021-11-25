const { SlashCommandBuilder } = require('@discordjs/builders');
const phrases = require('../data/Rekt');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rekt')
        .setDescription('Get rekt kiddo'),
    async execute(interaction) {
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        interaction.reply({
            content: phrase
        });
    }
}