const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class VisaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            aliases: ['poll'],
            group: 'misc',
            memberName: 'poll',
            description: 'Create a new reaction-based poll.',
            throttling: {
                usages: 1,
                duration: 3
            }
        });

        this.generateEmojiData = this.generateEmojiData.bind(this);
        this.getEmoji = this.getEmoji.bind(this);
        this.parseArgs = this.parseArgs.bind(this);
        this.run = this.run.bind(this);
        this.sendPoll = this.sendPoll.bind(this);
        this.setReactions = this.setReactions.bind(this);

        this.message;
    }

    generateEmojiData(args) {
        return args.map((arg, index) => {
            return {
                emoji: this.getEmoji(index + 1),
                data: arg
            };
        });
    }

    getEmoji(number) {
        switch (number) {
            case 1:
                return "1️⃣";
            case 2:
                return "2️⃣";
            case 3:
                return "3️⃣";
            case 4:
                return "4️⃣";
            case 5:
                return "5️⃣";
            case 6:
                return "6️⃣";
            case 7:
                return "7️⃣";
            case 8:
                return "8️⃣";
            case 9:
                return "9️⃣";
            default:
                return;
        }
    }

    parseArgs(args) {
        const splitArgs = args.split("|").map(x => x.trim()).filter(x => x);

        return {
            title: splitArgs.shift(),
            args: this.generateEmojiData(splitArgs)
        };
    }

    sendPoll(title, args) {
        if (!title || args?.length < 2 || args?.length > 9) {
            this.message.say("Invalid command usage. `!poll <title> | <option 1> | <option 2> | ...`. 9 options max.");
            return;
        }

        const embed = new MessageEmbed()
            .setTitle(title)
            .setFooter(`Asked by ${this.message.author.username}`)
            .setColor(0x48C9B0);

        let description = "";
        args.map(x => {
            description += `${x.emoji} ${x.data}\n`;
        });
        embed.setDescription(description);

        this.message.embed(embed)
        .then(pollMessage => {
            this.setReactions(pollMessage, args);
        })
        .catch(err => {
            console.error(err);
        });
    }

    setReactions(message, args) {
        args.map(async x => {
            await message.react(x.emoji)
            .catch(err => {
                console.error("Failed to add reaction to poll message.", err);
            });
        })
    }

    run(message, args) {
        this.message = message;
        const result = this.parseArgs(args);
        this.sendPoll(result.title, result.args);
    }
}