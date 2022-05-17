const { MessageEmbed, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { colors } = require('../data/Static');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Create an announcement')
        .addStringOption(option => 
            option.setName('title')
            .setDescription('Announcement title')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('message')
            .setDescription('Announcement message')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('author')
            .setDescription('Author name. (Default: Council of Ministers)')
        ),
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const message = interaction.options.getString('message');

        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(message)
            .setAuthor({
                name: interaction.options.getString('author') ?? "Council of Ministers", 
                iconURL: interaction.guild.iconURL()
            })
            .setColor(colors.teal);

        interaction.reply({
            embeds: [embed]
        });
    },
    permissions: {
        command: [Permissions.FLAGS.ADMINISTRATOR]
    }
}