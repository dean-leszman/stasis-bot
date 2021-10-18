const { Command } = require('discord.js-commando');
const { getBaseEmbed } = require('../../util');

const { 
    DEEP_STONE_CRYPT,
    GARDEN_OF_SALVATION,
    LAST_WISH,
    VAULT_OF_GLASS
} = require('../../data/Destiny 2/RaidInfo');

module.exports = class Destiny extends Command {
    constructor(client) {
        super(client, {
            name: 'destiny',
            aliases: ['d2'],
            group: 'games',
            memberName: 'destiny',
            description: 'Destiny commands',
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'category',
                prompt: 'Please enter a sub-command: `raid`',
                type: 'string',
                default: ''
            }, {
                key: 'type',
                prompt: 'Please enter a type',
                type: 'string',
                default: ''
            }]
        });

        this.getRaidInfo = this.getRaidInfo.bind(this);

        this.message;
    }

    getRaidInfo(raidName) {
        let raid;
        switch(raidName.toUpperCase()) {
            case "CRYPT":
            case "DEEP":
            case "DEEPSTONE":
            case "DEEPSTONECRYPT":
            case "DS":
            case "DSC":
            case "STONE":
                raid = DEEP_STONE_CRYPT;
                break;
            case "GARDEN":
            case "GARDENOFSALVATION":
            case "GOS":
            case "SALVATION":
                raid = GARDEN_OF_SALVATION;
                break;
            case "LAST":
            case "LASTWISH":
            case "LW":
            case "WISH":
                raid = LAST_WISH;
                break;
            case "GLASS":
            case "VAULT":
            case "VAULTOFGLASS":
            case "VOG":
                raid = VAULT_OF_GLASS;
                break;
            default:
                this.message.say("Invalid raid name.");
                return;
        }

        const embed = getBaseEmbed();
        embed.setTitle(raid.title);
        embed.setDescription(raid.description);
        return embed;
    }

    run(message, { category, type } ) {
        this.message = message;

        let embed = null;
        switch (category.toUpperCase()) {
            case "RAID":
                embed = this.getRaidInfo(type);
                break;
            default:
                this.message.say("Unrecognised command.");
                break;
        }

        if (embed) {
            message.embed(embed);
        }
    }
}