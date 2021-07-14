const { Command } = require('discord.js-commando');

module.exports = class ChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'channel',
            group: 'util',
            memberName: 'channel',
            description: 'Create a custom channel',
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'userLimit',
                prompt: 'Plase enter a user limit',
                type: 'string',
                default: ''
            }]
        });
    }

    run(message, { userLimit }) {

        if (userLimit === "help") {
            return message.say("Command usage: `!channel <max_users>`");
        }

        const users = parseInt(userLimit, 10);
        if (isNaN(users)) {
            return message.say("Error: Unknown number of users. Command usage: `!channel <max_users>`");
        }

        if (users <= 0 || users >= 100) {
            return message.say("Error: User count must be between 1 and 99");
        }
        const voiceCategoryChannel = message.guild.channels.cache.find(x => x.type === 'category' && x.name === 'Voice');
        message.guild.channels.create(`🎮 ${message.member.displayName}'s Room`, {
            type: 'voice',
            parent: voiceCategoryChannel,
            userLimit: users,
            permissionOverwrites: [{
                allow: "MOVE_MEMBERS",
                id: message.member.id,
                type: 'member'
            }]
        })
        .then(channel => {
            setTimeout(() => {
                if (!channel.members.first()) {
                    channel.delete();
                }
            }, 15000);
        });

        return message.say(`🎮 ${message.member.displayName}'s Room has been created.`);
    }
}