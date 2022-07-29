const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('View a list of commands supported by Stasis Bot.'),
    async execute(interaction) {
        let description = '';
        interaction.client.commands.each(command => {
            if (!command.wip) {
                description += `\`/${command.data.name}\` - ${command.data.description}\n`;
            }
        });

        const embed = new EmbedBuilder()
            .setTitle('Stasis Bot Commands')
            .setDescription(description);

        interaction.reply({
            embeds: [embed]
        });
    },
    channels: ["bot-commands"]
}