const { Command } = require('discord.js-commando');
const { getBaseEmbed, parseArgs } = require('../../util');

const { 
    DEEP_STONE_CRYPT,
    GARDEN_OF_SALVATION,
    LAST_WISH,
    VAULT_OF_GLASS
} = require('../../data/Destiny 2/RaidInfo');

module.exports = class PathOfExile extends Command {
    constructor(client) {
        super(client, {
            name: 'pathofexile',
            aliases: ['poe'],
            group: 'games',
            memberName: 'pathofexile',
            description: 'Destiny commands',
            throttling: {
                usages: 1,
                duration: 3
            }
        });

        this.getIncursionInfo = this.getIncursionInfo.bind(this);
        this.showHelp = this.showHelp.bind(this);
        this.message;
    }

    getIncursionInfo() {
        const embed = getBaseEmbed()
            .setTitle("Incursion Temple Rooms")
            .setDescription("Loot and Augment rooms for the Incursion temple. Underlined rooms are considered valuable.\n\n")
            .addFields({
                name: "**Armour**",
                value: "I: Armourer's Workshop\nII: Armoury\nIII: Chamber of Iron"
            }, {
                name: "**Atziri**",
                value: "I: Royal Meeting Room\nII: Hall of Lords\n__III: Throne of Atziri__"
            }, { 
                name: "**Breach**",
                value: "I: Splinter Research Lab\nII: Breach Containment Chamber\n__III: House of the Others__"
            }, { 
                name: "**Corruption**",
                value: "I: Corruption Chamber\nII: Catalyst of Corruption\n__III: Locus of Corruption__"
            }, { 
                name: "**Currency**",
                value: "__I: Vault\nII:Treasury\nWealth of the Vaal__"
            }, { 
                name: "**Gems**",
                value: "I: Gemcutter's Workshop\n__II: Department of Thaumaturgy\nIII: Doryani's Intitute__"
            }, { 
                name: "**Jewellery**",
                value: "I: Jeweller's Workshop\nII: Jewellery Forge\nIII: Glittering Halls"
            }, { 
                name: "**Legion (68+)**",
                value: "__I: Hall of Mettle\nII: Hall of Heroes\nIII: Hall of Legends__"
            }, { 
                name: "**Maps (68+)**",
                value: "__I: Surveyor's Study\nII: Office of Cartography\nIII: Atlas of Worlds__"
            }, {
                name: "**Nexus**",
                value: "__I: Shrine of Empowerment\nII: Sanctum of Unity\nIII: Temple Nexus__"
            }, { 
                name: "**Sacrifice**",
                value: "I: Sacrificial Chamber\nII: Hall of Offerings\n__III: Apex of Ascension__"
            }, { 
                name: "**Storage**",
                value: "I: Storage Room\nII: Warehouses\n__III: Museum of Artifacts__"
            }, { 
                name: "**Strongboxes**",
                value: "I: Strongbox Chamber\nII: Hall of Locks\nIII: Court of Sealed Death"
            }, { 
                name: "**Weapons**",
                value: "I: Sparring Room\nII: Arena of Valour\nIII: Hall of Champions"
            });

        this.message.embed(embed);
    }

    showHelp() {
        const embed = getBaseEmbed()
            .setTitle("Path of Exile Help")
            .setDescription("**Available Commands**\n" +
                "`!poe atlas` - View current Atlas layout" +
                "`!poe atlaspassives` - View Atlas passive locations" +
                "`!poe chromatics` - View Chromatic Orb calculator\n" +
                "`!poe guild` - View the Stasis guild\n" +
                "`!poe <league name>` - Quick-reference guides for each league's mechanics\n" +
                "`!poe wiki <search>` - Search the POE Wiki\n"
            )
            .setFooter("Command Aliases: !pathofexile | !poe");

        this.message.embed(embed);
    }

    run(message, args) {
        this.message = message;

        const [cmd, params] = parseArgs(args);

        switch (cmd.toUpperCase()) {
            case "HELP":
                this.getHelp();
                break;

            // Leagues
            case "BETRAYAL":
                message.say("https://www.wraeclast.com/wp-content/uploads/2021/07/syndicate_315_b.jpg");
                break;

            case "DELVE":
                message.say("https://i.imgur.com/yhzgMIx.png");
                break;

            case "ESSENCE":
                message.say("https://www.wraeclast.com/wp-content/uploads/2019/04/essence_conan.png");
                break;

            case "EXPEDITION":
                message.say("https://www.wraeclast.com/wp-content/uploads/2021/07/gwennen_cheatsheet_315d.jpg");
                break;

            case "HEIST":
                message.say("https://www.wraeclast.com/wp-content/uploads/2021/01/HeistCheatSheet_jan142021-1024x763.jpg");
                break;

            case "INCURSION":
                this.getIncursionInfo();
                break;

            // Misc
            case "ATLAS":
                message.say("https://i.imgur.com/CVaS4PW.png");
                break;
            case "ATLASPASSIVES":
                message.say("https://i.redd.it/x2cnn8ixyjt71.png");
                break;

            case "FILTER":
            case "FILTERBLADE":
                message.say("<https://www.filterblade.xyz>");
                break;

            case "GUILD":
                message.say("<https://www.pathofexile.com/guild/profile/807017>");
                break;

            case "POB":
            case "PATHOFBUILDING":
                message.say("<https://github.com/PathOfBuildingCommunity/PathOfBuilding>");
                break;

            case "TRADE":
                message.say("<https://www.pathofexile.com/trade>");
                break;

            case "CHROMATIC":
            case "CHROMATICS":
            case "VORICI":
                message.say("<https://siveran.github.io/calc.html>");
                break;

            case "WIKI":
                message.say(`<https://www.poewiki.net/w/index.php${params ? "?search=" + encodeURIComponent(params) : ""}>`);
                break;

            default:
                message.say(`Unrecognised command: "${cmd}"`);
                break;
        }

        return null;
    }
}