const { MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remember')
        .setDescription('You will remember that...'),
    async execute(interaction) {
        if (interaction.member.id == 128942677759623168) { // wulfric
            image = new MessageAttachment('./assets/wrememberthat.png');
            interaction.reply({
                files: [image]
            });
        } else {
            interaction.reply({
                content: `${interaction.member.displayName} will remember that.`
            });
        }
    }
}