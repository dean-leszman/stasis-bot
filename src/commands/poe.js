const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { atlas, builds, leagues, links } = require('../data/PathOfExile');
const { colors } = require('../data/Static');

const getWikiPage = (query) => `https://www.poewiki.net/w/index.php${query ? '?search=' + encodeURIComponent(query) : ''}`;

function findMapByName(name) {
    for (const [tier, maps] of Object.entries(atlas.tiers)) {
        const index = maps.findIndex(map => map.toLowerCase() === name.toLowerCase());
        if (index > -1) {
            return new EmbedBuilder()
            .setTitle(`${maps[index]}`)
            .setDescription(`${maps[index]} is a Tier ${tier} map in Path of Exile ${atlas.version}.\n[View wiki entry](${getWikiPage(maps[index] + " Map")})`);
        }
    }

    return false;
}

function getBuildsEmbed() {
    const embed = new EmbedBuilder()
        .setTitle("Path of Exile Builds")
        .setColor(colors.orange);

    builds.forEach(ascendancy => {
        let currentBuilds = "";
        
        ascendancy.builds.forEach(build => {
            currentBuilds += `[${build.name}](${build.link})\n`;
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

function getMapTiersEmbed(tier) {
    const embed = new EmbedBuilder()
        .setTitle(`${atlas.version} Atlas Map Tiers`)
        .setColor(colors.orange);

    if (tier) {
        const tierMaps = atlas.tiers[tier].join('\n');
        embed.addFields({
            name: `__Tier ${tier}__`,
            value: tierMaps
        })
    } else {
        for (const [tier, maps] of Object.entries(atlas.tiers)) {
            const tierMaps = maps.join('\n');
    
            embed.addFields({
                name: `__Tier ${tier}__`,
                value: tierMaps
            });
        }
    }
    
    return embed;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('poe')
        .setDescription('Path of Exile commands.')
        .addSubcommand(subcommand =>
            subcommand.setName('atlas')
            .setDescription('View all map tiers for the Atlas.')
            .addIntegerOption(option =>
                option.setName('tier')
                .setDescription('View specific Atlas map tier (1-16)')
                .setMinValue(1)
                .setMaxValue(16)
            )
            .addStringOption(option =>
                option.setName('map')
                .setDescription('Map to find')
            )
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
                const map = interaction.options.getString('map');
                if (map) {
                    const response = findMapByName(map);

                    if (response === false) {
                        interaction.reply({
                            content: `Sorry, ${map} was not found in the current Atlas. Try \`/poe atlas\` to view the current Atlas.`,
                            ephemeral: true
                        });
                    }

                    interaction.reply({
                        embeds: [response]
                    });
                    break;
                }

                const tier = interaction.options.getInteger('tier');
                interaction.reply({
                    embeds: [getMapTiersEmbed(tier)]
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
                    content: `<${getWikiPage(query)}>`
                });
                break;
            }
            default: {
                break;
            }
        }
    }
};