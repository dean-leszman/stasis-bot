const { MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shunned')
        .setDescription('You\'ve left a poor impression on the community.'),
    async execute(interaction) {
        image = new MessageAttachment('./assets/shunned.png');
        interaction.reply({
            files: [image]
        });
    }
}