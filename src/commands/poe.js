const { SlashCommandBuilder } = require('@discordjs/builders');
const { LEAGUES: leagues } = require('../data/PathOfExile');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poe')
    .setDescription('Path of Exile commands.')
    .addSubcommand(subcommand => 
        subcommand.setName('chromatics')
        .setDescription('Open Chromatic Orb calculator.')
    )
    .addSubcommand(subcommand => 
        subcommand.setName('filter')
        .setDescription('Open filterblade.xyz.')
    )
    .addSubcommand(subcommand => 
        subcommand.setName('guild')
        .setDescription('Open Stasis guild page.')
    )
    .addSubcommand(subcommand => 
        subcommand.setName('league')
        .setDescription('League-specific cheatsheets.')
        .addStringOption(option => {
            option.setName('league_name')
            .setDescription('The name of the league.')
            .setRequired(true);

            for (const [key, value] of Object.entries(leagues)) {
                option.addChoice(value.name, key);
            }

            return option;
        })
    )
    .addSubcommand(subcommand => 
        subcommand.setName('trade')
        .setDescription('Open Path of Exile trade site.')
    )
    .addSubcommand(subcommand =>
        subcommand.setName('wiki')
        .setDescription('Search via poewiki.')
        .addStringOption(option => 
            option.setName('query')
            .setDescription('Search query.')
        )
    ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'chromatics': {
                interaction.reply({
                    content: '<https://siveran.github.io/calc.html>'
                });
                break;
            }
            case 'filter': {
                interaction.reply({
                    content: '<https://www.filterblade.xyz>'
                });
                break;
            }
            case 'guild': {
                interaction.reply({
                    content: '<https://www.pathofexile.com/guild/profile/807017>'
                });
                break;
            }
            case 'league': {
                const leagueName = interaction.options.getString('league_name');

                interaction.reply({
                    content: leagues[leagueName].url
                });
                break;
            }
            case 'trade': {
                interaction.reply({
                    content: '<https://www.pathofexile.com/trade>'
                });
                break;
            }
            case 'wiki': {
                const query = interaction.options.getString('query');
                interaction.reply({
                    content: `<https://www.poewiki.net/w/index.php${query ? '?search=' + encodeURIComponent(query) : ''}>`
                });
                break;
            }
            default: {
                break;
            }
        }
    }
};