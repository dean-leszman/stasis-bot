const { VOICECHANNELS } = require('../../data/Stasis/Server');

/* Create a new voice channel when somebody joins the lobby voice channel */
module.exports = function (oldState, newState) {
    if (oldState.channel) {
        if (!oldState.channel.members.first()) {
            if (!VOICECHANNELS.includes(oldState.channel.name)) {
                oldState.channel.delete()
                .catch(err => {
                    console.error("[Channel Generator] Failed to delete channel: ", err);
                });
            }
        }
    }

    if (newState.channel) {
        if (newState.channel.name === "Channel Creator") {
            const voiceCategoryChannel = newState.guild.channels.cache.find(x => x.type === 'category' && x.name === 'Voice');
            newState.guild.channels.create(`🎮 ${newState.member.displayName}'s Room `, {
                type: 'voice',
                parent: voiceCategoryChannel
            })
            .then((channel) => {
                newState.setChannel(channel);
            });
        }
    }
}