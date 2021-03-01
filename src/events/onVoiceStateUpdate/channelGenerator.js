const channels = {};
channels["704340805346787379"] = true; // A Quiet Place
channels["757629611919147251"] = true; // Channel Creator
channels["704339593637396481"] = true; // Big Boi Lounge

/* Create a new voice channel when somebody joins the lobby voice channel */
module.exports = function (oldState, newState) {
    
    if (oldState.channel) {
        if (!oldState.channel.members.first()) {
            if (!channels[oldState.channel.id]) {
                oldState.channel.delete();
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