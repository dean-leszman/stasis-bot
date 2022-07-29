const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { colors } = require('../data/Static');

const optionEmojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];

/**
 * Add emojis to the poll message
 * @param {object} message The Discord message to react to
 * @param {number} count The amount of options for this poll
 */
function addReactions(message, count) {
    const reactions = [...optionEmojis].splice(0, count);
    reactions.map(async emoji => await message.react(emoji));
}


function createEmbed(title, options) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor(colors.teal);

    let description = '';
    for (let i = 0; i < options.length; i++) {
        description += `${optionEmojis[i]} ${options[i]}\n`;
    }
    embed.setDescription(description);

    return embed;
}

async function createPoll(interaction) {
    const title = interaction.options.getString('title');
    let options = [];

    for (let i = 0; i < 10; i++) {
        if (interaction.options.getString(`option_${i + 1}`)) {
            options.push(interaction.options.getString(`option_${i + 1}`));
        }
    }

    const embed = createEmbed(title, options);
    const message = await interaction.reply({
        embeds: [embed],
        fetchReply: true
    });

    addReactions(message, options.length);
}

function getHelpEmbed() {
    return new EmbedBuilder()
        .setTitle('/poll - Help')
        .setDescription('Create a reaction-based poll.\nMinimum 1 option. Maximum 9 options.')
        .addFields({ name: '**Command Usage**', value: '`/poll title="Poll title" option_1="Your first option"...`' });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a reaction-based poll.')
        .addSubcommand(command => 
            command.setName('create')
            .setDescription('Create a new poll.')
            .addStringOption(option => 
                option.setName('title')
                .setDescription('What question do you want to ask?')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('option_1')
                .setDescription('Your first option.')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('option_2')
                .setDescription('Your second option.')
            )
            .addStringOption(option =>
                option.setName('option_3')
                .setDescription('Your third option.')
            )
            .addStringOption(option =>
                option.setName('option_4')
                .setDescription('Your fourth option.')
            )
            .addStringOption(option =>
                option.setName('option_5')
                .setDescription('Your fifth option.')
            )
            .addStringOption(option =>
                option.setName('option_6')
                .setDescription('Your sixth option.')
            )
            .addStringOption(option =>
                option.setName('option_7')
                .setDescription('Your seventh option.')
            )
            .addStringOption(option =>
                option.setName('option_8')
                .setDescription('Your eight option.')
            )
            .addStringOption(option =>
                option.setName('option_9')
                .setDescription('Your ninth option.')
            )
        )
        .addSubcommand(command => 
            command.setName('help')
            .setDescription('View /poll help')
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'create':
                createPoll(interaction);
                break;
            case 'help':
                interaction.reply({
                    embeds: [getHelpEmbed()],
                    ephemeral: true
                });
                break;
        }
    }
}