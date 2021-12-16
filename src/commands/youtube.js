const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtube')
        .setDescription('Search on YouTube')
        .addStringOption(option => 
            option.setName('query')
            .setDescription('Search query.')
            .setRequired(true)
        ),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        await interaction.reply({
            content: `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
        });
    }
};