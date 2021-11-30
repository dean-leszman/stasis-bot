const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { COLORS: colors } = require('../data/Static');
const SteamAPI = require('../data/Steam');
const { STEAM_API_KEY } = process.env;
const fetch = require('node-fetch');

async function CallSteamAPI(api, params) {
    api += `?key=${STEAM_API_KEY}`;

    for (const [key, value] of Object.entries(params)) {
        api += `&${key}=${value}`;
    }

    const response = await fetch(`${api}`);
    return (await response.json()).response;
}

async function ResolveVanityUrl(vanityUrl) {
    const params = {
        vanityurl: vanityUrl,
        url_type: 1
    };

    const response = await CallSteamAPI(SteamAPI.ResolveVanityUrl, params);

    const embed = new MessageEmbed()
        .setTitle('Steam ID')
        .setColor(colors.teal);

    switch (response.success) {
        case 1: {
            embed.setDescription(`**Vanity URL:** ${vanityUrl}\n**SteamID64:** ${response.steamid}`);
            break;
        }
        case 42: {
            embed.setDescription(`**Vanity URL:** ${vanityUrl}\n*No account found.*`);
            break;
        }
        default: {
            embed.setDescription('Failed to contact Steam API. Please try again later.');
            embed.setColor(colors.red);
        }
    }

    return embed;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steam')
        .setDescription('Steam related commands.')
        .addSubcommand(subcommand =>
            subcommand.setName('id')
            .setDescription('Resolve a vanity name into the account\'s SteamID64')
            .addStringOption(option => 
                option.setName('vanity_url')
                .setDescription('Vanity URL of the account.')
                .setRequired(true)
            )
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        await interaction.deferReply();

        let embed;
        switch (subcommand) {
            case 'id': {
                const name = interaction.options.getString('vanity_url');
                embed = await ResolveVanityUrl(name);
                break;
            }
            default: {
                embed = new MessageEmbed()
                    .setTitle('**Steam**')
                    .setDescription(`Subcommand '${subcommand}' does not exist.`)
                    .setColor(colors.red);
                break;
            }
        }

        interaction.editReply({
            embeds: [embed]
        });
    }
}