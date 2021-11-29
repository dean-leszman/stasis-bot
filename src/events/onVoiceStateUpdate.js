const { CHANNEL: config, VOICECHANNELS: voiceChannels } = require('../data/Config');
const { ChannelType } = require('discord-api-types/v9');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        if (oldState.channel) {
            if (!oldState.channel.members.first()) {
                if (!voiceChannels.includes(oldState.channel.name)) {
                    if (!oldState.channel.deleted) {
                        oldState.channel.delete()
                        .catch(err => {
                            console.error("[Channel Generator] Failed to delete channel: ", err);
                        });
                    }
                }
            }
        }
    
        if (newState.channel) {
            if (newState.channel.name === "Channel Creator") {
                const categoryChannel = newState.guild.channels.cache.find(x => x.type === 'GUILD_CATEGORY' && x.name === config.categoryName);
                categoryChannel.createChannel(`🎮 ${newState.member.displayName}'s Room`, {
                    type: ChannelType.GuildVoice
                })
                .then((channel) => {
                    newState.setChannel(channel);
                });
            }
        }
    }
};