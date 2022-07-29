const { EmbedBuilder } = require('discord.js');
const { server: config } = require('../data/Config');
const { colors } = require('../data/Static');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, member) {
        const logChannel = member.guild.channels.cache.find(channel => channel.id === config.logChannel);
        if (oldMember.displayName !== member.displayName) {
            const embed = new EmbedBuilder()
                .setTitle("__Name Changed__")
                .setColor(colors.orange)
                .addFields({ 
                    name: "Old", 
                    value: oldMember.displayName, 
                    inline: true
                }, {
                    name: "New", 
                    value: member.displayName
                });

            logChannel.send({
                embeds: [embed]
            });
        }
    }
}