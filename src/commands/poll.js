const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { COLORS: colors } = require('../data/Static');

const optionEmojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];

function addReactionsToEmbed(embed, count) {
    const reactions = [...optionEmojis].splice(0, count);
    reactions.map(async x => {
        await embed.react(x);
    });
}

function createEmbed(title, options) {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setColor(colors.teal);

    let description = '';
    for (let i = 0; i < options.length; i++) {
        description += `${optionEmojis[i]} ${options[i]}\n`;
    }
    embed.setDescription(description);

    return embed;
}

function getHelpEmbed() {
    return new MessageEmbed()
        .setTitle('Poll Help')
        .setDescription('Create a reaction-based poll.\nMinimum 2 options. Maximum 9 options.')
        .addField('**Command Usage**', `/poll title|option|option...`);
}

function validateTitle(interaction, title) {
    if (!title || (title && title.length !== 1)) {
        interaction.reply({
            content: 'You must provide a title.',
            ephemeral: true
        });
        return false;
    }

    if (title && title.length !== 1) {
        interaction.reply({
            content: 'You must provide only one title flag.',
            ephemeral: true
        });
        return false;
    }

    return true;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a reaction-based poll.')
        .addStringOption(option =>
            option.setName('text')
            .setDescription('Poll arguments')
        ),
    async execute(interaction) {
        const text = interaction.options.getString('text');

        let embed;
        let length;
        if (!text || text === 'help') {
            embed = getHelpEmbed();
        } else {
            const args = text.split('|').map(x => x.trim()).filter(x => x);

            if (!(args && args.length && args.length > 2 && args.length < 11)) { // title + 2 - title + 9
                interaction.reply({
                    content: 'Invalid command usage. Use `/poll help` for help.',
                    ephemeral: true
                });
                return;
            }

            embed = createEmbed(args.shift(), args);
            embed.setFooter(`Asked by ${interaction.member.displayName}`);
            length = args.length;
        }

        const message = await interaction.reply({
            embeds: [embed],
            fetchReply: true
        });

        addReactionsToEmbed(message, length);
    }
}