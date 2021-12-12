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
        .setColor(colors.teal);

    if (maps[mapName].content) {
        embed.setDescription(maps[mapName].content);
    }

    if (maps[mapName].url) {
        embed.setImage(maps[mapName].url);
    }
        
    return embed;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eft')
        .setDescription('Escape From Tarkov commands.')
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
        ),
    async execute(interaction) {
        let embed;

        switch (interaction.options.getSubcommand()) {
            case 'ammo': {
                embed = getAmmoInfo(interaction.options.getString('ammo_type'));
                break;
            }
            case 'map': {
                embed = getMapInfo(interaction.options.getString('map_name'));
                break;
            }
            default: {
                break;
            }
        }

        interaction.reply({
            content: 'Information may be outdated with the 12.12 update.',
            embeds: [embed]
        });
    }
};