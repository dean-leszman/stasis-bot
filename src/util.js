const { MessageEmbed } = require('discord.js');

module.exports = {
    getBaseEmbed: () => {
        const embed = new MessageEmbed();

        embed.setTitle("Default title");
        embed.setColor(0x1ABC9C);

        return embed;
    },
    getEmoji: function(type) {
        switch (type.toLowerCase()) {
            case "one":
            case "1":
                return ":one:";
            case "smile":
                return "😄";
            default:
                return "";
        }
    },
    getRandomNumber: function(max) {
        if (!max) max = 1;
    
        return Math.floor((Math.random() * max) + 1);
    },
    parseArgs: function(args) {
        const index = args.indexOf(" ");
        const command = index === -1 ? args : args.slice(0, index);
        const params = index !== -1 ? args.slice(index, args.length).trim() : null;

        return [command, params];
    }
}