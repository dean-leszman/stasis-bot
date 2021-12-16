const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wikipedia')
        .setDescription('Search on Wikipedia')
        .addStringOption(option => 
            option.setName('query')
            .setDescription('Search query.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        await interaction.reply({
            content: `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`
        });
    }
};