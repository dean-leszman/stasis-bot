const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const { rules } = require('../data/Config');
const { colors } = require('../data/Static');

function getRulesEmbed() {
    let description = '';

    rules.forEach(rule => {
        description += `**${rule.name}**\n${rule.value}\n\n`;
    });

    return embed = new EmbedBuilder()
        .setTitle('Server Rules')
        .setDescription(description)
        .setColor(colors.teal);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Server commands.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand => 
            subcommand.setName('rules')
            .setDescription('Create the rules embed.')
        ),
    async execute(interaction) {
        let embed;
        switch (interaction.options.getSubcommand()) {
            case 'rules': {
                embed = getRulesEmbed();
                break;
            }
            default: {
                break;
            }
        }

        interaction.channel.send({
            embeds: [embed]
        });

        interaction.reply({
            content: 'Success!',
            ephemeral: true
        });
    }
}