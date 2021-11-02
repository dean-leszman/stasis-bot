const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const ammoTypes = [];

ammoTypes["12 GAUGE"] = {
    name: '12 Gauge',
    value: 'Budget Ammo: *12/70 8.5 mm "Magnum" Buckshot*\nBest Ammo: *12/70 AP-20 Slug*\nBest Weapon: *Saiga 12ga ver. 10 12/76 shotgun*\n[View all 12 Gauge ammo](https://i.imgur.com/fv31kZT.png)'
}

ammoTypes["20 GAUGE"] = {
    name: '20 Gauge',
    value: 'Budget Ammo: *20/70 5.6mm Buckshot*\nBest Ammo: *20/70 Slug Poleva-6u*\nBest Weapon: *TOZ-106 bolt-action shotgun*\n[View all 20 Gauge ammo](https://i.imgur.com/sNk6pS0.png)'
}

ammoTypes[".300"] = {
    name: '.300',
    value: 'Budget Ammo: *.300 BCP FMJ*\nBest Ammo: *.300 AP*\nBest Weapon: *SIG MCX .300 AAC Blackout Assault Rifle*\n[View all .300 ammo](https://i.imgur.com/schUNd3.png)'
}

ammoTypes[".338"] = {
    name: '.338',
    value: 'Budget Ammo: *.338 UPZ*\nBest Ammo: *.338 AP*\nBest Weapon: *MK-18 .338 LM Marksman Rifle*\n[View all .338 ammo](https://i.imgur.com/ohULLPQ.png)'
}

ammoTypes[".366"] = {
    name: '.366',
    value: 'Budget Ammo: *.366 TKM EKO*\nBest Ammo: *.366 AP*\nBest Weapon: *Vepr AKM / VPO-209 366TKM carbine*\n[View all .366 ammo](https://i.imgur.com/JoHLU3F.png)'
}

ammoTypes[".45"] = {
    name: '.45',
    value: 'Budget Ammo: *.45 ACP*\nBest Ammo: *.45 ACP AP*\nBest Weapon: *TDI KRISS Vector Gen.2 .45 ACP submachinegun*\n[View all .45 ACP ammo](https://i.imgur.com/ViUMpiw.png)'
}

ammoTypes["4.6X30MM"] = {
    name: '4.6x30mm',
    value: 'Budget Ammo: *4.6x30mm Subsonic SX*\nBest Ammo: *4.6x30mm AP SX*\nBest Weapon: *HK MP7A2 4.6x30 submachinegun*\n[View all 4.6x30mm ammo](https://i.imgur.com/xDk7kXn.png)'
}

ammoTypes["5.45X39MM"] = {
    name: '5.45x39mm',
    value: 'Budget Ammo: *5.45x39 mm BP*\nBest Ammo: *5.45x39 mm PPBS "Igolnik"*\nBest Weapon: *AK-74N*\n[View all 5.45x39mm ammo](https://i.imgur.com/GUsTYez.png)'
}

ammoTypes["5.56X45MM"] = {
    name: '5.56x45mm',
    value: 'Budget Ammo: *5.56x45 mm M856A1*\nBest Ammo: *5.56x45 mm M855A1*\nBest Weapon: *Colt M4A1 5.56x45 Assault Rifle*\n[View all 5.56x45mm ammo](https://i.imgur.com/tsWKo7o.png)'
}

ammoTypes["5.7X28MM"] = {
    name: '5.7x28mm',
    value: 'Budget Ammo: *5.7x28 mm L191*\nBest Ammo: *5.7x28 mm SB193*\nBest Weapon: *FN P90 5.7x28 submachinegun*\n[View all 5.7x28mm ammo](https://i.imgur.com/TLVajdW.png)'
}

ammoTypes["7.62X25MM"] = {
    name: '7.62x25mm',
    value: 'Best Ammo: *7.62x25mm TT Pst gzh*\nBest Weapon: *TT pistol 7.62x25 TT*\n[View all 7.62x25mm ammo](https://i.imgur.com/NvfADnL.png)'
}

ammoTypes["7.62X39MM"] = {
    name: '7.62x39mm',
    value: 'Budget Ammo: *7.62x39 mm PS*\nBest Ammo: *7.62x39 mm BP*\nBest Weapon: *AKM(N) 7.62x39 assault rifle*\n[View all 7.62x39mm ammo](https://i.imgur.com/OJcOpgE.png)'
}

ammoTypes["7.62X51MM"] = {
    name: '7.62x51mm',
    value: 'Budget Ammo: *7.62x51 mm M80*\nBest Ammo: *7.62x51 mm M61*\nBest Weapon: *Springfield Armory M1A 7.62x51*\n[View all 7.62x51mm ammo](https://i.imgur.com/KKQjvgN.png)'
}

ammoTypes["7.62X54R"] = {
    name: '7.62x54R',
    value: 'Budget Ammo: *7.62x54R LPS Gzh*\nBest Ammo: *7.62x54R BS*\nBest Weapon: *SVDS 7.62x54 Sniper rifle*\n[View all 7.62x54R ammo](https://i.imgur.com/mGbOim1.png)'
}

ammoTypes["9X18MM"] = {
    name: '9x18mm',
    value: 'Budget Ammo: *9x18 mm PST gzh*\nBest Ammo: *9x18 mm PM PBM*\nBest Weapon: *PP-91 "Kedr"*\n[View all 9x18mm ammo](https://i.imgur.com/JAQOUmy.png)'
}

ammoTypes["9X19MM"] = {
    name: '9x19mm',
    value: 'Budget Ammo: *9x19 mm Pst gzh*\nBest Ammo: *9x19 mm PBP*\nBest Weapon: *SIG MPX 9x19 Submachine gun*\n[View all 9x19mm ammo](https://i.imgur.com/a5x91Aw.png)'
}

ammoTypes["9X21MM"] = {
    name: '9x21mm',
    value: 'Best Ammo: *9x21 mm BT (Tracer)*\nBest Weapon: *9x21 Seryukov automatic pistol SR1MP Gyurza*\n[View all 9x21mm ammo](https://i.imgur.com/x8vfv16.png)'
}

ammoTypes["9X39MM"] = {
    name: '9x39mm',
    value: 'Budget Ammo: *9x39 mm SP-5*\nBest Ammo: *9x39 mm BP*\nBest Weapon: *AS VAL*\n[View all 9x39mm ammo](https://i.imgur.com/njSHsgL.png)'
}

ammoTypes["12.7X55MM"] = {
    name: '12.7x55mm',
    value: 'Budget Ammo: *12.7x55 mm PS12*\nBest Ammo: *12.7x55 mm PS12B*\nBest Weapon: *ASh-12 12.7x55 assault rifle*\n[View all 12.7x55mm ammo](https://i.imgur.com/bvBsCNX.png)'
}

ammoTypes["23X75MM"] = {
    name: '23x75mm',
    value: 'Budget Ammo: *Shrapnel 10*\nBest Ammo: *"Barricade" Slug*\nMisc Ammo: *"Star" Flashbang Slug*\nBest Weapon: *TOZ KS-23M 23x75mm shotgun*\n[View all 23x75mm ammo](https://i.imgur.com/KaH7Fl2.png)'
}

function getHelp() {
    return new MessageEmbed()
    .setTitle('**Escape From Tarkov Help**')
    .setDescription('**Commands**')
    .addFields({
        name: '`!tarkov help\`',
        value: 'View the Escape From Tarkov help.'
    }, {
        name: '`!tarkov ammo [type]`',
        value: 'View information for a specific ammo type.\n*Example: `!tarkov ammo 9x19mm`*'
    }, {
        name: '`!tarkov <maps|map> [map]`',
        value: 'View a selectable list of maps, or get information for a specific map.\n*Example: `!tarkov map customs`*'
    })
    .setFooter('Aliases: !eft | !escapefromtarkov')
    .setColor(0x48C9B0);
}

function getAmmoByType(type) {
    let messageEmbed = new MessageEmbed()
        .setTitle('**Escape From Tarkov Ammo**');

    if (ammoTypes[type]) {
        messageEmbed.addFields(ammoTypes[type]);
    } else {
        const ammo = Object.keys(ammoTypes).map(key => {
            return key;
        })
        messageEmbed.setTitle('Sorry, unable to find that ammo type.');
        messageEmbed.addFields({
            name: '**Supported Ammo Types**',
            value: ammo.map((key, value) => {
                return value.name
            })
        });
    }

    return messageEmbed
        .setColor(0x48C9B0);
}

function getAllAmmoTypes() {
    const response = new MessageEmbed()
        .setTitle("**Escape From Tarkov Ammo Types**");

    Object.keys(ammoTypes).forEach(key => {
        response.addFields(ammoTypes[key]);
    })

    response.setColor(0x48C9B0);

    return response;
}

function getMap(map) {
    let response;

    switch(map) {
        case "CUSTOMS":
            response = 'https://i.redd.it/li3qea6fl8e51.png';
            break;
        case "FACTORY":
            response = "https://i.imgur.com/h0sNjSc.png";
            break;
        case "INTERCHANGE":
            response = "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/e/e5/InterchangeMap_Updated_4.24.2020.png/revision/latest?cb=20200424115935";
            break;
        case "LABS":
        case "LABORATORY":
            response = "https://www.gamemaps.co.uk/game/tarkov/maps/lab_explained_en";
            break;
        case "RESERVE":
            response = "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/9/9f/Keys_and_doors_v3.png/revision/latest?cb=20191213063256";
            break;
        case "RESORT":
            response = "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/3/34/UNKSO_Shoreline_Resort_Loot_Map_VER_2.0.png/revision/latest?cb=20190723032442";
            break;
        case "SHORELINE":
            response = "https://i.redd.it/b3ej9fyjrtf51.png";
            break;
        case "WOODS":
            response = "https://i.imgur.com/h0uz9rY.jpg";
            break;
        default:
            return getAllMaps();
    }

    return response;
}

function getAllMaps() {
    return new MessageEmbed()
        .setTitle('**Escape From Tarkov Maps**')
        .setDescription('Select from one of the maps below:')
        .addFields({
            name: 'Customs',
            value: '<https://i.imgur.com/AAZhPrj.png>'
        }, {
            name: 'Factory',
            value: '<https://i.imgur.com/yYRHXD9.jpg>'
        }, {
            name: 'Interchange',
            value: '<https://i.imgur.com/aUXxB3j.jpg>'
        }, {
            name: 'Labs',
            value: '<https://www.gamemaps.co.uk/game/tarkov/maps/lab_explained_en>'
        }, {
            name: 'Reserve',
            value: '<https://i.imgur.com/ExJTzEU.jpg>'
        }, {
            name: 'Resort',
            value: 'https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/3/34/UNKSO_Shoreline_Resort_Loot_Map_VER_2.0.png/revision/latest?cb=20190723032442'
        }, {
            name: 'Shoreline', 
            value: '<https://i.imgur.com/OjSqUzp.jpg>'
        }, {
            name: 'Woods',
            value: '<https://i.imgur.com/QH6STpH.png>'
        })
        .setColor(0x48C9B0);
}

module.exports = class TarkovCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tarkov',
            aliases: ['eft', 'escapefromtarkov'],
            group: 'games',
            memberName: 'escapefromtarkov',
            description: 'View information on Tarkov ammo types or maps',
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'category',
                prompt: 'Please enter a sub-command: `ammo | maps | map <map_name> | help`',
                type: 'string',
                default: ''
            }, {
                key: 'type',
                prompt: 'Please enter a type to view:',
                type: 'string',
                default: ''
            }]
        });
    }

    run(message, { category, type }) {
        switch (category.toUpperCase()) {
            case "AMMO":
                if (type) return message.embed(getAmmoByType(type.toUpperCase()));
                return message.embed(getAllAmmoTypes());
            case "CUSTOMS":
            case "FACTORY":
            case "INTERCHANGE":
            case "LABS":
            case "LABORATORY":
            case "SHORELINE":
            case "RESERVE":
            case "RESORT":
            case "WOODS":
                return message.say(getMap(category.toUpperCase()));
            case "MAPS":
            case "MAP":
                return message.say(getMap(type.toUpperCase()));
            case "KEYS":
                return message.say("https://i.imgur.com/7UbjEPq.png");
            case "HELP":
            case "":
                return message.embed(getHelp());
            case "LOG":
                return message.say("<https://docs.google.com/spreadsheets/d/1iOZH1bZD4jjhKNA-iwlW7_orvkbf4s0E3mpQahUJT7k/edit?usp=sharing>");
            default:
                return message.say("Sorry, I didn't understand that request. For help, use `!tarkov help`.");
        }
    }
}