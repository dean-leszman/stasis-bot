const { EmbedBuilder } = require('discord.js');
const { channelMention } = require('@discordjs/builders');
const { server: config } = require('../data/Config');
const { colors } = require('../data/Static');

module.exports = {
    name: 'channelCreate',
    async execute(channel) {
        const logChannel = channel.guild.channels.cache.find(channel => channel.id === config.logChannel);

        const embed = new EmbedBuilder()
            .setTitle('__Channel Created__')
            .addFields({ 
                name: '**Channel**', 
                value: `${channelMention(channel.id)}\n${channel.id}`,
                inline: true
            }, { 
                name: '**Parent**', 
                value: `${channel.parent ? channel.parent.name : 'None'}\n${channel.parent ? channel.parent.id : 'None'}`, 
                inline: true
            }, { 
                name: '**Type**', 
                value: `${channel.type}`, 
                inline: true
            })
            .setColor(colors.green)
            .setFooter({
                text: `Created on ${new Date().toLocaleString('en-GB')}`
            });

        logChannel.send({
            embeds: [embed]
        });
    }
}