const { MessageEmbed } = require('discord.js');
const { SERVER: config } = require('../data/Config');
const { colors } = require('../data/Static');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMember, member) {
        const logChannel = member.guild.channels.cache.find(channel => channel.id === config.logChannel);
        if (oldMember.displayName !== member.displayName) {
            const embed = new MessageEmbed()
                .setTitle("__Name Changed__")
                .setColor(colors.orange)
                .addField("Old", oldMember.displayName, true)
                .addField("New", member.displayName);

            logChannel.send({
                embeds: [embed]
            });
        }
    }
}