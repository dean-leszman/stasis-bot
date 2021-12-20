const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { COLORS: colors } = require('../data/Static');
const { AMMO: ammo, MAPS: maps } = require('../data/EscapeFromTarkov');

function getAmmoInfo(ammoType) {
    return new MessageEmbed()
        .setTitle(`Escape From Tarkov Ammo - ${ammo[ammoType].name}`)
        .setDescription(ammo[ammoType].description)
        .setColor(colors.teal);
}

function getMapInfo(mapName) {
    const embed = new MessageEmbed()
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
            .addStringOption(option => {
                option.setName('ammo_type')
                .setDescription('The type of ammo.')
                .setRequired(true);

                for (const [key, value] of Object.entries(ammo)) {
                    option.addChoice(value.name, key);
                }

                return option;
            })
        )
        .addSubcommand(subcommand =>
            subcommand.setName('map')
            .setDescription('View map details.')
            .addStringOption(option => {
                option.setName('map_name')
                .setDescription('The name of the map.')
                .setRequired(true);
        
                for (const [key, value] of Object.entries(maps)) {
                    option.addChoice(value.name, key);
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
                embed = getAmmoInfo(interaction.options.getString('ammo_type'));
                await interaction.reply({
                    embeds: [embed]
                });
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
};