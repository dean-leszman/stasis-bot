const { SlashCommandBuilder } = require('@discordjs/builders');
const { channel: config } = require('../data/Config');
const { ChannelType, OverwriteType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Create a private channel.')
        .addIntegerOption(option =>
            option.setName('max_users')
            .setDescription('Maximum number of users (Max 99).')
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const userLimit = interaction.options.getInteger('max_users');
        const categoryChannel = interaction.guild.channels.cache.find(x => x.type === ChannelType.GuildCategory && x.name === config.categoryName);

        if (!categoryChannel) {
            console.error(`Unable to find ${config.categoryName} channel category.`);
            await interaction.editReply({
                content: 'Failed to create channel.',
                ephemeral: true
            });
            return;
        }

        categoryChannel.children.create({
            name: `🎮 ${interaction.member.displayName}'s Room`,
            type: ChannelType.GuildVoice,
            userLimit: userLimit,
            permissionOverwrites: [{
                allow: [PermissionFlagsBits.MoveMembers],
                id: interaction.member.id,
                type: OverwriteType.Member
            }]
        })
        .then(async channel => {
            setTimeout(async () => { // delete channel if nobody is in it after a duration
                if (!(channel.fetch() && channel.members.first())) {
                    channel.delete();

                    interaction.editReply({
                        content: 'Your channel was deleted for inactivity.',
                        ephemeral: true
                    });
                }
            }, config.deleteTimeout * 1000);

            await interaction.editReply({
                content: `Your channel has been created.`,
                ephemeral: true
            });
        });
    }
}