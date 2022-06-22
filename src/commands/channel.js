const { SlashCommandBuilder } = require('@discordjs/builders');
const { channel: config } = require('../data/Config');
const { Permissions } = require('discord.js');
const { ChannelType } = require('discord-api-types/v9');

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
        
        const categoryChannel = interaction.guild.channels.cache.find(x => x.type === 'GUILD_CATEGORY' && x.name === config.categoryName);

        categoryChannel.createChannel(`🎮 ${interaction.member.displayName}'s Room`, {
            type: ChannelType.GuildVoice,
            userLimit: userLimit,
            permissionOverwrites: [{
                allow: Permissions.FLAGS.MOVE_MEMBERS,
                id: interaction.member.id,
                type: 'member'
            }]
        })
        .then(async channel => {
            interaction.client.channelCache.add(channel);
            setTimeout(async () => { // delete channel if nobody is in it after a duration
                if (interaction.client.channelCache.has(channel) && !channel.members.first()) {
                    channel.delete();
                    interaction.client.channelCache.delete(channel);

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
    },
    channels: ["bot-commands"]
}