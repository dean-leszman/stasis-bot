const { EmbedBuilder } = require('discord.js');
const { server: config } = require('../data/Config');
const { colors } = require('../data/Static');

module.exports = {
    name: 'channelDelete',
    async execute(channel) {
        const logChannel = channel.guild.channels.cache.find(channel => channel.id === config.logChannel);

        const embed = new EmbedBuilder()
            .setTitle('__Channel Deleted__')
            .addFields({ 
                name: '**Channel**', 
                value: `${channel.name}\n${channel.id}`, 
                inline: true
            }, {
                name: '**Type**', 
                value: `${channel.type}`, 
                inline: true
            })
            .setColor(colors.red)
            .setFooter({
                text: `Deleted on ${new Date().toLocaleString('en-GB')}`
            });

        if (channel.parent) {
            embed.addFields({ 
                name: '**Parent**', 
                value: `${channel.parent.name}\n${channel.parent.id}`, 
                inline: true
            });
        }

        logChannel.send({
            embeds: [embed]
        });
    }
}