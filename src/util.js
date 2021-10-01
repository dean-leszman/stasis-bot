const { MessageEmbed } = require('discord.js');

module.exports = {
    getBaseEmbed: () => {
        const embed = new MessageEmbed();

        embed.setTitle("Example title");
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
    }
}