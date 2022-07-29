const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shunned')
        .setDescription('You\'ve left a poor impression on the community.'),
    async execute(interaction) {
        image = new AttachmentBuilder('./assets/shunned.png');
        interaction.reply({
            files: [image]
        });
    }
}