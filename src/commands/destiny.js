const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { RAIDS: raids } = require('../data/Destiny');
const { colors } = require('../data/Static');

function getRaidInfo(raidName) {
    return new EmbedBuilder()
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
                    option.addChoices({ name: value.name, value: key });
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
}