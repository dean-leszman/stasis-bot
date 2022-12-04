const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { atlas, builds, leagues, links } = require('../data/PathOfExile');
const { colors } = require('../data/Static');

function getBuildsEmbed() {
    const embed = new EmbedBuilder()
        .setTitle("Path of Exile Builds")
        .setColor(colors.orange);

    builds.forEach(ascendancy => {
        let currentBuilds = "";
        
        ascendancy.builds.forEach(build => {
            currentBuilds += `[${build.name}](${build.link})`;
        });

        embed.addFields({
            name: ascendancy.ascendancy,
            value: currentBuilds
        });
    });

    return embed;
}

function getLinksEmbed() {
    const embed = new EmbedBuilder().setTitle("Path of Exile Links").setColor(colors.orange);
    let description = "";

    links.forEach(link => {
        description += `**${link.name}**\n<${link.url}>\n\n`;
    });

    embed.setDescription(description);
    return embed;
}

function getMapTiersEmbed() {
    const embed = new EmbedBuilder().setTitle("3.17 Atlas Tiers").setColor(colors.orange);
    atlas.map((tier, i) => {
        let tierMaps = "";
        tier.forEach(map => {
            tierMaps += `${map}\n`
        });
        embed.addFields({ name: `__Tier ${i + 1}__`, value: tierMaps });
    });

    return embed;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('poe')
        .setDescription('Path of Exile commands.')
        .addSubcommand(subcommand =>
            subcommand.setName('atlas')
            .setDescription('View all map tiers for the Atlas.')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('builds')
            .setDescription('View suggested builds for the current league.'))
        .addSubcommand(subcommand => 
            subcommand.setName('league')
            .setDescription('League-specific cheatsheets.')
            .addStringOption(option => {
                option.setName('league_name')
                .setDescription('The name of the league.')
                .setRequired(true);

                for (const [key, value] of Object.entries(leagues)) {
                    option.addChoices({ name: value.name, value: key });
                }

                return option;
            })
        )
        .addSubcommand(subcommand => 
            subcommand.setName('links')
            .setDescription('View useful Path of Exile links.')
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
            case 'atlas': {
                interaction.reply({
                    embeds: [getMapTiersEmbed()]
                });
                break;
            }
            case 'builds':
                interaction.reply({
                    embeds: [getBuildsEmbed()]
                });
                break;
            case 'league': {
                const leagueName = interaction.options.getString('league_name');
                interaction.reply({
                    content: leagues[leagueName].url
                });
                break;
            }
            case 'links': {
                interaction.reply({
                    embeds: [getLinksEmbed()]
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
    },
    channels: ["path-of-exile"]
};