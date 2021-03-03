const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

function getHelp() {
    return new MessageEmbed()
    .setTitle('**ARMA 3 Help**')
    .setDescription('**Commands**')
    .addFields({
        name: '`!arma help`',
        value: 'Show the ARMA help'
    }, {
        name: '`!arma info`',
        value: 'View game server, ts, etc. info'
    }, {
        name: '`!arma loadouts`',
        value: 'Get standard loadouts to import to your arsenal'
    }, {
        name: '`!arma mods`',
        value: 'Get the ARMA 3 mod preset'
    }, {
        name: '`!arma roster`',
        value: 'View the active roster'
    })
    .setColor(0x48C9B0);
}

function getInfo() {
    return new MessageEmbed()
    .setTitle('**ARMA 3 Server Info**')
    .setDescription('Server IP: `82.43.161.78`\nTeamspeak IP: `82.43.161.78`')
    .addFields({
        name: '**Fire Teams**',
        value: 'Fire Teams allow you to customise your gear further and enable more freedom in operations. To create a fire team, you need to be decently active and meet the 4-player minimum requirement.'
    })
    .setColor(0x48C9B0);
}

function getLoadouts() {
    return new MessageEmbed()
    .setTitle('**ARMA 3 Loadouts**')
    .setDescription(
        '**How to Import**\nCopy the content from the relevant loadout, go to the ***ACE arsenal*** (via Tutorial > ACE Arsenal at the in-game menu) and click **Import**.\n\n' + 
        '[Base](https://pastebin.com/raw/J8rmZSzd)\n' + 
        '[Autorifleman](https://pastebin.com/raw/efMGy9rC)\n' + 
        '[Demolitions](https://pastebin.com/raw/VSDUEdUE)\n' + 
        '[Engineer](https://pastebin.com/raw/mHDFgJbJ)\n' + 
        '[Grenadier](https://pastebin.com/raw/51mdqFgy)\n' + 
        '[Marksman](https://pastebin.com/raw/3gAsYduT)\n' + 
        '[Medic](https://pastebin.com/raw/MbA3r1qK)\n' + 
        '[Rifleman](https://pastebin.com/raw/p9VwdREQ)\n' + 
        '[Sniper](https://pastebin.com/raw/VH3xTf9b)\n' + 
        '[Squad Leader](https://pastebin.com/raw/n7EFHPjf)\n')
    .setColor(0x48C9B0);
}

function getModList() {
    return new MessageEmbed()
    .setTitle('**ARMA 3 Mod List**')
    .setDescription('[Mod Preset](https://discord.com/channels/398082048142737409/662409576380891146/816736147878969354)')
    .setColor(0x48C9B0);
}

function getRoster() {
    return new MessageEmbed()
    .setTitle('**ARMA 3 Roster**')
    .setDescription('[View Roster](https://docs.google.com/spreadsheets/d/1CiycuS2h2iuL6GcBmGcU9Vx7o9v3btDQPfHS_5fGDqM/edit?usp=sharing)')
    .setColor(0x48C9B0);
}

module.exports = class ArmaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'arma',
            group: 'games',
            memberName: 'arma',
            description: 'ARMA 3 related commands',
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'category',
                prompt: 'Please enter a sub-command: `help | info | loadouts | mods | roster`',
                type: 'string',
                default: ''
            }]
        })
    }

    run(message, { category }) {
        switch(category.toUpperCase()) {
            case "LOADOUT":
            case "LOADOUTS":
            case "GUNS":
                return message.embed(getLoadouts());
            case "MODS":
            case "MODLIST":
            case "WORKSHOP":
            case "COLLECTION":
                return message.embed(getModList());
            case "RANKS":
            case "ROSTER":
                return message.embed(getRoster());
            case "INFO":
                return message.embed(getInfo());
            case "HELP":
            case "":
                return message.embed(getHelp());
            default:
                return message.say("Sorry, I didn't understand that command. For help, use `!arma help`.");
        }
    }
}