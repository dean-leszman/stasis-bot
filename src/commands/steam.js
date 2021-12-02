const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { COLORS: colors } = require('../data/Static');
const { IPlayerService, ISteamUser } = require('../data/Steam');
const { STEAM_API_KEY } = process.env;
const fetch = require('node-fetch');

/***************************************************
    Helper functions
***************************************************/
/**
 * Generate a query string from supplied object
 * @param {object} params 
 */
function generateQueryString(params) {
    let queryString = '';
    Object.entries(params).forEach(([key, value], i) => {
        queryString += `${ i === 0 ? "?" : "&" }${ key }=${ value }`;
    });

    return queryString;
}

/**
 * The user's current status.
 * If the player's profile is private, this will always be "0", except is the user has set their status to looking to trade or looking to play, because a bug makes those status appear even if the profile is private.
 * https://developer.valvesoftware.com/wiki/Steam_Web_API
 * @param {number} status personastate
 */
function getPlayerStatus(status) {
    switch (status) {
        case 0: {
            return "Offline";
        }
        case 1: {
            return "Online";
        }
        case 2: {
            return "Busy";
        }
        case 3: {
            return "Away";
        }
        case 4: {
            return "Snooze";
        }
        case 5: {
            return "Looking to trade";
        }
        case 6: {
            return "Looking to play";
        }
        default: {
            return "Unknown";
        }
    }
}


/***************************************************
    Steam API functions
***************************************************/
/**
 * Request Steam API
 * @param {*} api 
 */
async function SteamAPI(api) {
    const response = await fetch(api);
    return await response.json();
}

/***************************************************
    Steam API functions - IPlayerService
***************************************************/
/**
 * Get games owned by the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetOwnedGames(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid,
        include_appinfo: true,
        include_played_free_games: true
    });

    const api = IPlayerService.GetOwnedGames + queryString;
    return await SteamAPI(api);
}

/**
 * Get user groups of the account
 * @param {*} vanityUrl Vaniry URL of account
 */
async function Steam_ResolveVanityUrl(vanityUrl) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        vanityurl: vanityUrl
    });

    const api = ISteamUser.ResolveVanityUrl + queryString;
    return await SteamAPI(api);
}


/***************************************************
    Bot functions - Player
***************************************************/
async function resolveVanityUrl(interaction) {
    const vanityurl = interaction.options.getString('vanityurl');
    const response = (await Steam_ResolveVanityUrl(vanityurl)).response;

    let embed = new MessageEmbed()
        .setTitle('Steam ID')
        .setColor(colors.teal);
    
    if (response && response.success) {
        switch (response.success) {
            case 1: {
                embed.setDescription(`**Vanity URL:** ${vanityurl}\n**Steam ID:** ${response.steamid}`)
                break;
            }
            case 42: {
                embed.setDescription('Failed to find a user with that vanity name.')
                .setColor(colors.red);
                break;
            }
        }
    } else {
        embed.setDescription('Failed to contact Steam servers. Please try again later.')
        .setColor(colors.red);
    }

    await interaction.editReply({
        embeds: [embed]
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steam')
        .setDescription('Steam related commands.')
        .addSubcommand(subcommand =>
            subcommand.setName('id')
            .setDescription('Get the SteamID64 of an account.')
            .addStringOption(option => 
                option.setName('vanityurl')
                .setDescription('Vanity URL of the user.')
                .setRequired(true)
            )
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        await interaction.deferReply();

        switch (subcommand) {
            case 'id': {
                await resolveVanityUrl(interaction);
                break;
            }
        }
    }
}