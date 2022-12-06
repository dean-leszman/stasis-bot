const { ChannelType, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

async function getCurrentChannel(interaction) {
    const voiceState = interaction.member.voice;

    if (!(voiceState && voiceState.channel)) {
        await interaction.followUp({
            content: "You must be in a voice channel to migrate all users.",
            ephemeral: true
        });
        console.log("3 Current Fail");
        return null;
    }

    return voiceState.channel;
}

function getVoiceChannels(interaction) {
    const channels = interaction.guild.channels.cache;
    return voiceChannels = channels.filter(x => x.type === ChannelType.GuildVoice);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('migrate')
        .setDescription('Migrate users in a voice channel to another voice channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => 
            option.setName('channel')
            .setDescription('Channel name to move users to.')
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const currentChannel = await getCurrentChannel(interaction);
        if (currentChannel === null) {
            return;
        }

        const voiceChannels = getVoiceChannels(interaction);
        const nextChannels = voiceChannels.filter(x => x.name === interaction.options.getString('channel'));
        if (!nextChannels) {
            await interaction.followUp({
                content: 'Voice channel not found.',
                ephemeral: true
            });

            return;
        }

        if (currentChannel.id === nextChannel.id) {
            await interaction.followUp({
                content: 'You are already in that channel!',
                ephemeral: true
            });
            
            return;
        }

        const nextChannel = nextChannels.first();
        currentChannel.members.forEach(async member => {
            await member.voice.setChannel(nextChannel);
        });

        await interaction.followUp({ 
            content: 'Users have been moved.',
            ephemeral: true 
        });
    },
    channels: ["bot-commands"],
    disabled: true
}