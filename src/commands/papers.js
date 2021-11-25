const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('papers')
        .setDescription('Papers, please.')
        .addSubcommand(subcommand =>
            subcommand.setName('granted')
            .setDescription('Grant access through the border.')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('denied')
            .setDescription('Deny access through the border.')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('citation')
            .setDescription('Issue a citation.')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('detain')
            .setDescription('Detain the criminal.')
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'granted': {
                interaction.reply({
                    content: 'https://i.imgur.com/5GJzJdu.png'
                });
                break;
            }
            case 'denied': {
                interaction.reply({
                    content: 'https://i.imgur.com/2lKt16i.png'
                });
                break;
            }
            case 'citation': {
                interaction.reply({
                    content: 'https://media.tenor.com/images/29bd83a5e16f966b561b309c595524af/tenor.gif'
                });
                break;
            }
            case 'detain': {
                interaction.reply({
                    content: 'https://i.kym-cdn.com/photos/images/original/001/908/670/270.gif'
                });
                break;
            }
            default: {
                break;
            }
        }
    }
}