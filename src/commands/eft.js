const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { colors } = require('../data/Static');
const { maps } = require('../data/EscapeFromTarkov');

function getMapInfo(mapName) {
    const embed = new EmbedBuilder()
        .setTitle(`Escape From Tarkov - ${maps[mapName].name}`)
        .setImage(maps[mapName].url)
        .setColor(colors.teal);
        
    return embed;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eft')
        .setDescription('Escape From Tarkov commands.')
        .addSubcommand(subcommand =>
            subcommand.setName('ammo')
            .setDescription('View ammo details.')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('map')
            .setDescription('View map details.')
            .addStringOption(option => {
                option.setName('map_name')
                .setDescription('The name of the map.')
                .setRequired(true);
        
                for (const [key, value] of Object.entries(maps)) {
                    option.addChoices({ name: value.name, value: key });
                }
        
                return option;
            })
        )
        .addSubcommand(subcommand => 
            subcommand.setName("status")
            .setDescription("View Escape From Tarkov service status.")
        )
        .addSubcommand(subcommand =>
            subcommand.setName('wiki')
            .setDescription('Search via EFT wiki.')
            .addStringOption(option => 
                option.setName('query')
                .setDescription('Search query.')
            )
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'ammo': {
                await interaction.reply({
                    content: '<https://docs.google.com/spreadsheets/d/1l_8zSZg-viVTZ2bavMEIIKhix6mFTXuVHWcNKZgBrjQ/edit>'
                })
                return;
            }
            case 'map': {
                embed = getMapInfo(interaction.options.getString('map_name'));
                await interaction.reply({
                    embeds: [embed]
                });
                return;
            }
            case 'status': {
                await interaction.reply({
                    content: `<https://status.escapefromtarkov.com/>`
                });
                return;
            }
            case 'wiki': {
                const query = interaction.options.getString('query');
                await interaction.reply({
                    content: `<https://escapefromtarkov.fandom.com/${query ? 'wiki/Special:Search?query=' + encodeURIComponent(query) : ''}>`
                });
                return;
            }
            default: {
                break;
            }
        }
    }
}