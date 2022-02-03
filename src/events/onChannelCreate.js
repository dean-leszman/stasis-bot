const { MessageEmbed } = require('discord.js');
const { channelMention } = require('@discordjs/builders');
const { SERVER: config } = require('../data/Config');
const { colors } = require('../data/Static');

module.exports = {
    name: 'channelCreate',
    async execute(channel) {
        const logChannel = channel.guild.channels.cache.find(channel => channel.id === config.logChannel);

        const embed = new MessageEmbed()
            .setTitle('__Channel Created__')
            .addField('**Channel**', `${channelMention(channel.id)}\n${channel.id}`, true)
            .addField('**Parent**', `${channel.parent ? channel.parent.name : 'None'}\n${channel.parent ? channel.parent.id : 'None'}`, true)
            .addField('**Type**', `${channel.type}`, true)
            .setColor(colors.green)
            .setFooter(`Created on ${new Date().toLocaleString('en-GB')}`);

        logChannel.send({
            embeds: [embed]
        });
    }
}