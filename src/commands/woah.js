const { SlashCommandBuilder } = require('discord.js');
const responses = require('../data/Woah');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('woah')
        .setDescription('Woah, woah, woah!'),
    async execute(interaction) {
        const response = responses[Math.floor(Math.random() * responses.length)];

        interaction.reply({
            content: response
        });
    }
}