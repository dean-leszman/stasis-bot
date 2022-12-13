const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

let _data = [];
const filepath = "./assets/xmas.csv";
const fs = require("fs");
const readline = require("readline");
const logChannelId = "1052215121931403317"; // #gift-log

async function getData() {
    return new Promise((resolve, reject) => {
        if (Array.isArray(_data) && _data.length > 0) {
            resolve(_data);
        }

        // read csv into memory because I cba to set up a database
        const stream = fs.createReadStream(filepath);
        const reader = readline.createInterface({ input: stream });
        
        reader.on('line', (row) => {
            const [type, tier, donor, donorId, giftName, key, giftValue, recipient, recipientId, event, notes] = row.split(',');

            _data.push({
                type,
                tier,
                donor,
                donorId,
                giftName,
                key,
                giftValue,
                recipient,
                recipientId,
                event,
                notes
            }); // only load unclaimed prizes
        });

        reader.on('close', () => {
            resolve(_data);
        });

        reader.on('error', error => {
            console.error(error);
            reject(error);
        });
    });
}

async function getLogChannel(interaction) {
    let logChannel = await interaction.guild.channels.fetch(logChannelId);
    if (!logChannel) {
        throw new Error("Log channel not found.");
    }

    return logChannel;
}

function getLogMessage({ event, prize, user }) {
    let message = `[${event}] **${prize.giftName}** has been given to ${user.username}#${user.discriminator}: \`${prize.key}\``;

    if (prize.notes) {
        // there is a note for the prize
        message += ` *Note: ${prize.notes}*`;
    }

    return message;
}

async function getPrize() {
    return new Promise((resolve) => {
        getData()
        .then(data => {
            const random = Math.floor(Math.random() * data.length);
            const prize = data[random];
            resolve({ prize, index: random });
        });
    });
}

function savePrize({ event, index, user }) {
    _data[index].event = event;
    _data[index].recipient = `${user.username}#${user.discriminator}`;
    _data[index].recipientId = user.id;
}

function getUserMessage({ prize, user }) {
    let message = `Congratulations ${user.username}! You have won **${prize.giftName}**: \`${prize.key}\``;

    if (prize.notes) {
        // there is a note for the prize
        message += ` *Note: ${prize.notes}*`;
    }

    return message;
}

async function saveData() {
    const arrayData = _data.map(row => {
        return [
            row.type,
            row.tier,
            row.donor,
            row.donorId,
            row.giftName,
            row.key,
            row.value,
            row.recipient,
            row.recipientId,
            row.event,
            row.notes
        ];
    });

    const csvData = arrayData.map(row => row.join(',')).join('\n');

    await fs.writeFile(filepath, csvData, 'utf8', (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Giveaway data saved.");
        }
    });

    _data = [];
}

async function sendToUser({ interaction, prize, user }) {
    const message = getUserMessage({ prize, user });
    await user.send(message)
    .then(() => {
        console.log(`Prize given to ${user.username}#${user.discriminator} by ${interaction.member.displayName}#${user.discriminator}`);
    })
    .catch(async error => {
        console.error(error);
        const logChannel = await getLogChannel(interaction);
        logChannel.send(`Unable to send prize ${prize.giftName} \`${prize.key}\` to ${user.username}#${user.discriminator}.${prize.notes ? "Note: " + prize.notes : ""}`);
    });
}

async function createLog({ event, interaction, prize, user }) {
    const message = getLogMessage({ event, prize, user });
    const logChannel = await getLogChannel(interaction);
    logChannel.send(message);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xmas')
        .setDescription('It\'s Christmaaaaaaaaaaas!')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The user to receive a prize.')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('event')
            .setDescription('The type of event the prize was awarded from.')
            .addChoices(
                { name: 'Giveaway', value: 'Giveaway' },
                { name: 'Game Night', value: 'Game Night'},
                { name: 'Other', value: 'Other'}
            )
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        interaction.deferReply({
            ephemeral: true
        });

        const user = interaction.options.getUser('user');
        const event = interaction.options.getString('event');
        const { index, prize } = await getPrize();
        await savePrize({ event, index, user });
        await sendToUser({ interaction, prize, user });
        await createLog({ event, interaction, prize, user });

        interaction.followUp({
            content: "Prize awarded successfully.",
            ephemeral: true
        });

        await saveData();
    },
    channels: ["bot-commands"]
}