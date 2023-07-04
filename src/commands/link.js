const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Create a shortened link')
        .addStringOption(option =>
            option.setName('link')
            .setDescription('The link to navigate to')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('text')
            .setDescription('The text to display')
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('preview')
            .setDescription('Allow Discord to show the preview of the link (default: false)')
        ),
    async execute(interaction) {
        const link = interaction.options.getString('link');
        const text = interaction.options.getString('text');

        try {
            new URL(link); // parse URL

            const showPreview = interaction.options.getBoolean('preview') ?? false;
            let url = link;
            if (showPreview === false) {
                url = `<${url}>`; // wrap url in <> to prevent Discord showing preview embed
            }
            
            interaction.reply({
                content: `[${text}](${url})`
            });
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: `An error occurred: ${err.message}`
            });
            return;
        }
    }
}