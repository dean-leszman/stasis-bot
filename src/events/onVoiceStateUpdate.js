const { ChannelType } = require('discord.js');
const { channel: config, voiceChannels, voiceChannelCreator } = require('../data/Config');

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState) {
        if (oldState.channel) {
            if (!oldState.channel.members.first()) {
                if (!voiceChannels.includes(oldState.channel.name)) {
                    if (oldState.channel.client.channelCache.has(oldState.channel)) { // check channel is in cache
                        oldState.channel.client.channelCache.delete(oldState.channel); // remove from cache
                        oldState.channel.delete()
                        .catch(err => {
                            console.error("[Channel Generator] Failed to delete channel: ", err);
                        });
                    }
                }
            }
        }
    
        if (newState.channel) {
            if (newState.channel.name === voiceChannelCreator) {
                const categoryChannel = newState.guild.channels.cache.find(x => x.type === ChannelType.GuildCategory && x.name === config.categoryName);
                categoryChannel.children.create({
                    name: `🎮 ${newState.member.displayName}'s Room`,
                    type: ChannelType.GuildVoice
                })
                .then((channel) => {
                    newState.channel.client.channelCache.add(channel); // add to channel cache
                    newState.setChannel(channel); // move user to channel
                });
            }
        }
    }
};