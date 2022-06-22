const { MessageEmbed } = require('discord.js');
const { server: config } = require('../data/Config');
const { colors } = require('../data/Static');

module.exports = {
    name: 'channelDelete',
    async execute(channel) {
        const logChannel = channel.guild.channels.cache.find(channel => channel.id === config.logChannel);

        const embed = new MessageEmbed()
            .setTitle('__Channel Deleted__')
            .addField('**Channel**', `${channel.name}\n${channel.id}`, true)
            .addField('**Type**', `${channel.type}`, true)
            .setColor(colors.red)
            .setFooter({
                text: `Deleted on ${new Date().toLocaleString('en-GB')}`
            });

        if (channel.parent) {
            embed.addField('**Parent**', `${channel.parent.name}\n${channel.parent.id}`, true);
        }

        logChannel.send({
            embeds: [embed]
        });
    }
}