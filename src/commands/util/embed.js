const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

const { getBaseEmbed } = require("../../util");

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'embed',
            group: 'util',
            memberName: 'embed',
            description: 'Create an embed',
            userPermissions: ['MANAGE_MESSAGES']
        });

        this.embed;
        this.message;

        this.parseEmbedString = this.parseEmbedString.bind(this);
        this.showEmbedHelp = this.showEmbedHelp.bind(this);
    }

    parseEmbedString(data) {
        // Title
        const title = data.match(/(?<=--title=")([^"]+)(?=")/ig);
        if (title && title.length === 1) {
            this.embed.setTitle(title);
        }

        // Description
        const description = data.match(/(?<=--description=")([^"]+)(?=")/ig);
        if (description && description.length === 1) {
            this.embed.setDescription(description);
        }
        
        // Fields
        const field1name = data.match(/(?<=--field1name=")([^"]+)(?=")/ig);
        const field1value = data.match(/(?<=--field1value=")([^"]+)(?=")/ig);
        if (field1name && field1name.length === 1 && field1value && field1value.length) {
            this.embed.addField(field1name[0], field1value[0]);
        }
        
        const field2name = data.match(/(?<=--field2name=")([^"]+)(?=")/ig);
        const field2value = data.match(/(?<=--field2value=")([^"]+)(?=")/ig);
        if (field2name && field2name.length === 1 && field2value && field2value.length) {
            this.embed.addField(field2name[0], field2value[0]);
        }
        
        const field3name = data.match(/(?<=--field3name=")([^"]+)(?=")/ig);
        const field3value = data.match(/(?<=--field3value=")([^"]+)(?=")/ig);
        if (field3name && field3name.length === 1 && field3value && field3value.length) {
            this.embed.addField(field3name[0], field3value[0]);
        }
        
        const field4name = data.match(/(?<=--field4name=")([^"]+)(?=")/ig);
        const field4value = data.match(/(?<=--field4value=")([^"]+)(?=")/ig);
        if (field4name && field4name.length === 1 && field4value && field4value.length) {
            this.embed.addField(field4name[0], field4value[0]);
        }

        const field5name = data.match(/(?<=--field5name=")([^"]+)(?=")/ig);
        const field5value = data.match(/(?<=--field5value=")([^"]+)(?=")/ig);
        if (field5name && field5name.length === 1 && field5value && field5value.length) {
            this.embed.addField(field5name[0], field5value[0]);
        }

        const field6name = data.match(/(?<=--field6name=")([^"]+)(?=")/ig);
        const field6value = data.match(/(?<=--field6value=")([^"]+)(?=")/ig);
        if (field6name && field6name.length === 1 && field6value && field6value.length) {
            this.embed.addField(field6name[0], field6value[0]);
        }

        const field7name = data.match(/(?<=--field7name=")([^"]+)(?=")/ig);
        const field7value = data.match(/(?<=--field7value=")([^"]+)(?=")/ig);
        if (field7name && field7name.length === 1 && field7value && field7value.length) {
            this.embed.addField(field7name[0], field7value[0]);
        }

        const field8name = data.match(/(?<=--field8name=")([^"]+)(?=")/ig);
        const field8value = data.match(/(?<=--field8value=")([^"]+)(?=")/ig);
        if (field8name && field8name.length === 1 && field8value && field8value.length) {
            this.embed.addField(field8name[0], field8value[0]);
        }

        const field9name = data.match(/(?<=--field9name=")([^"]+)(?=")/ig);
        const field9value = data.match(/(?<=--field9value=")([^"]+)(?=")/ig);
        if (field9name && field9name.length === 1 && field9value && field9value.length) {
            this.embed.addField(field9name[0], field9value[0]);
        }

        const field10name = data.match(/(?<=--field10name=")([^"]+)(?=")/ig);
        const field10value = data.match(/(?<=--field10value=")([^"]+)(?=")/ig);
        if (field10name && field10name.length === 1 && field10value && field10value.length) {
            this.embed.addField(field10name[0], field10value[0]);
        }

        // Image
        const image = data.match(/(?<=--image=")([^"]+)(?=")/ig);
        if (image && image.length === 1) {
            this.embed.setImage(image[0]);
        }

        // Thumbnail
        const thumbnail = data.match(/(?<=--thumbnail=")([^"]+)(?=")/ig);
        if (thumbnail && thumbnail.length === 1) {
            this.embed.setThumbnail(thumbnail[0]);
        }

        // Footer
        const footer = data.match(/(?<=--footer=")([^"]+)(?=")/ig);
        const footerIcon = data.match(/(?<=--footerimage=")([^"]+)(?=")/ig);
        if (footer && footer.length === 1) {
            const footerText = footer[0];
            const footerIconUrl = footerIcon && footerIcon.length ? footerIcon[0] : null;
            this.embed.setFooter(footerText, footerIconUrl)
        }

        // Color
        const color = data.match(/(?<=--color=")([^"]+)(?=")/ig);
        if (color && color.length === 1) {
            this.embed.setColor(color[0]);
        }

        // Timestamp
        const timestamp = data.match(/(--timestamp)/ig);
        if (timestamp && timestamp.length === 1) {
            this.embed.setTimestamp();
        }

        // URL
        const url = data.match(/(?<=--url=")([^"]+)(?=")/ig);
        if (url && url.length === 1) {
            this.embed.setURL(url);
        }

        // Author
        const author = data.match(/(--author)/ig);
        const authorName = data.match(/(?<=--authorname=")([^"]+)(?=")/ig);
        const authorIcon = data.match(/(?<=--authoricon=")([^"]+)(?=")/ig);
        const authorUrl = data.match(/(?<=--authorurl=")([^"]+)(?=")/ig);
        if (author && author.length === 1) {
            const avatarUrl = `https://cdn.discordapp.com/avatars/${this.message.author.id}/${this.message.author.avatar}.png?size=128`; // hack around Discord.js not providing url
            this.embed.setAuthor(this.message.author.username, avatarUrl);
        } else if (authorName && authorName.length === 1) {
            const name = author[0];
            const iconUrl = authorIcon && authorIcon.length === 1 ? authorIcon[0] : null;
            const url = authorUrl && authorUrl.length === 1 ? authorUrl[0] : null;
            this.embed.setAuthor(name, iconUrl, url);
        }
    }

    showEmbedHelp() {
        this.embed.setTitle("Embed Help")
        .setDescription("Create a custom embed using flag-separated values.")
        .addFields({
            name: "**Example Usage**",
            value: "`!embed --flagName=\"Flag value\";--flagName2=\"Flag value 2\";...`"
        }, {
            name: "**Supported Flags**",
            value: "`--title=\"<text>\"`\n" + 
                "`--description=\"<text>\"`\n" +
                "`--field1name=\"<text>\"`\n" +
                "`--field1value=\"<text>\"`\n" +
                "`--field2name=\"<text>\"`\n" +
                "`--field2value=\"<text>\"`\n" +
                "`...`\n" +
                "`--field10name\"<text>\"`\n" +
                "`--field10value=\"<text>\"`\n" +
                "`--image=\"<text>\"`\n" +
                "`--thumbnail=\"<text>\"`\n" +
                "`--footer=\"<text>\"`\n" +
                "`--url=\"<text>\"`\n" +
                "`--author`\n" +
                "`--authorname=\"<text>\"`\n" +
                "`--authoricon=\"<text>\"`\n" +
                "`--authorurl=\"<text>\"`\n" +
                "`--color=\"<color name / hex code>\"`\n" +
                "`--timestamp`"
        });
    }

    run(message, args) {
        this.message = message;
        this.embed = getBaseEmbed();

        if (args.toUpperCase() === "HELP") {
            this.showEmbedHelp();
        } else {
            this.parseEmbedString(args);
        }
        
        return message.embed(this.embed);
    }
}