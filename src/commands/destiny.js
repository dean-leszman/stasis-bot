const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { RAIDS: raids } = require('../data/Destiny');
const { COLORS: colors } = require('../data/Static');

function getRaidInfo(raidName) {
    return new MessageEmbed()
        .setTitle(`Destiny 2 - ${raids[raidName].name} Guide`)
        .setDescription(raids[raidName].description)
        .setColor(colors.teal);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('destiny')
        .setDescription('Destiny 2 commands.')
        .addSubcommand(subcommand =>
            subcommand.setName('raid')
            .setDescription('View raid information.')
            .addStringOption(option => {
                option.setName('raid_name')
                .setDescription('Name of the raid.')
                .setRequired(true);

                for (const [key, value] of Object.entries(raids)) {
                    option.addChoice(value.name, key);
                }

                return option;
            })
        ),
    async execute(interaction) {
        let embed;
        switch (interaction.options.getSubcommand()) {
            case 'raid': {
                embed = getRaidInfo(interaction.options.getString('raid_name'));
                break;
            }
        }

        interaction.reply({
            embeds: [embed]
        })
    },
    channels: ["destiny"]
};