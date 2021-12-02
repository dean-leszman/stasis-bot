const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { COLORS: colors } = require('../data/Static');
const { IPlayerService, ISteamApps, ISteamNews, ISteamUser, ISteamUserStats } = require('../data/Steam');
const { STEAM_API_KEY } = process.env;
const fetch = require('node-fetch');

let _appList;

/***************************************************
    Helper functions
***************************************************/
function generateQueryString(params) {
    let queryString = '';
    params.map((entry, i) => {
        const [key, value] = Object.entries(entry);

        queryString += `${i === 0 ? "?" : "&"}${key}=`;
        if (value instanceof Array) {
            value.forEach((val, j) => {
                result += `${j > 0 ? "," : ""}${val}`;
            });
        } else {
            result += value;
        }

        return queryString;
    });
}

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
 * Get badges for the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetBadges(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid
    });

    const api = IPlayerService.GetBadges + queryString;
    return await SteamAPI(api);
}

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
 * Get recently played games of the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetRecentlyPlayedGames(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid,
        count: 10
    });

    const api = IPlayerService.GetRecentlyPlayedGames + queryString;
    return await SteamAPI(api);
}

/**
 * Get Steam level of the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetOwnedGames(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid
    });

    const api = IPlayerService.GetSteamLevel + queryString;
    return await SteamAPI(api);
}

/***************************************************
    Steam API functions - ISteamApps
***************************************************/
/**
 * Get badges for the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetAppList() {
    const api = ISteamApps.GetAppList;
    return await SteamAPI(api);
}

/***************************************************
    Steam API functions - ISteamNews
***************************************************/
/**
 * Get badges for the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetNewsForApp(appid) {
    const queryString = generateQueryString({
        appid: appid
    });

    const api = ISteamNews.GetNewsForApp + queryString;
    return await SteamAPI(api);
}

/***************************************************
    Steam API functions - ISteamUser
***************************************************/
/**
 * Get friends list of the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetFriendList(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid
    });

    const api = ISteamUser.GetFriendList + queryString;
    return await SteamAPI(api);
}

/**
 * Get bans of the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetPlayerBans(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid
    });

    const api = ISteamUser.GetPlayerBans + queryString;
    return await SteamAPI(api);
}

/**
 * Get summary of the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetPlayerSummaries(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid
    });

    const api = ISteamUser.GetPlayerSummaries + queryString;
    return await SteamAPI(api);
}

/**
 * Resolve vanity URL into SteamID64
 * @param {*} vanityUrl Vaniry URL of account
 */
async function Steam_GetUserGroupList(vanityUrl) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid
    });

    const api = ISteamUser.GetUserGroupList + queryString;
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
    Bot functions - Game
***************************************************/
async function getAppList(interaction) {
    await interaction.editReply({
        content: 'getAppList',
        ephemeral: true
    });
}

async function getNewsForApp(interaction) {
    await interaction.editReply({
        content: 'getNewsForApp',
        ephemeral: true
    });
}

async function handleGame(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case 'list': {
            await getAppList(interaction);
            break;
        }
        case 'news': {
            await getNewsForApp(interaction);
            break;
        }
    }
}


/***************************************************
    Bot functions - Player
***************************************************/
async function getBadges(interaction) {
    await interaction.editReply({
        content: 'getBadges',
        ephemeral: true
    });
}

async function getFriendList(interaction) {
    await interaction.editReply({
        content: 'getFriendList',
        ephemeral: true
    });
}

async function getOwnedGames(interaction) {
    await interaction.editReply({
        content: 'getOwnedGames',
        ephemeral: true
    });
}

async function getRecentlyPlayerGames(interaction) {
    await interaction.editReply({
        content: 'getRecentlyPlayedGames',
        ephemeral: true
    });
}

async function getPlayerBans(interaction) {
    await interaction.editReply({
        content: 'getPlayerBans',
        ephemeral: true
    });
}

async function getPlayerSummaries(interaction) {
    await interaction.editReply({
        content: 'getPlayerSummaries',
        ephemeral: true
    });
}

async function getSteamLevel(interaction) {
    await interaction.editReply({
        content: 'getSteamLevel',
        ephemeral: true
    });
}

async function getUserGroupList(interaction) {
    await interaction.editReply({
        content: 'getUserGroupList',
        ephemeral: true
    });
}

async function resolveVanityUrl(interaction) {
    await interaction.editReply({
        content: 'resolveVanityUrl',
        ephemeral: true
    });
}

async function handlePlayer(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case 'badges': {
            await getBadges(interaction);
            break;
        }
        case 'bans': {
            await getPlayerBans(interaction);
            break;
        }
        case 'friends': {
            await getFriendList(interaction);
            break;
        }
        case 'group': {
            await getUserGroupList(interaction);
            break;
        }
        case 'level': {
            await getSteamLevel(interaction);
            break;
        }
        case 'owned': {
            await getOwnedGames(interaction);
            break;
        }
        case 'recent': {
            await getRecentlyPlayerGames(interaction);
            break;
        }
        case 'summary': {
            await getPlayerSummaries(interaction);
            break;
        }
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steam')
        .setDescription('Steam related commands.')
        .addSubcommandGroup(group => 
            group.setName('player')
            .setDescription('Player related commands')
            .addSubcommand(subcommand => 
                subcommand.setName('badges')
                .setDescription('Get badges for a Steam user.')
                .addStringOption(option => 
                    option.setName('steamid')
                    .setDescription('SteamID64 of the account.')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => 
                subcommand.setName('bans')
                .setDescription('Get bans for a Steam user.')
                .addStringOption(option => 
                    option.setName('steamid')
                    .setDescription('SteamID64 of the account.')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => 
                subcommand.setName('friends')
                .setDescription('Get friends list for a Steam user.')
                .addStringOption(option => 
                    option.setName('steamid')
                    .setDescription('SteamID64 of the account.')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => 
                subcommand.setName('level')
                .setDescription('Get level for a Steam user.')
                .addStringOption(option => 
                    option.setName('steamid')
                    .setDescription('SteamID64 of the account.')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => 
                subcommand.setName('owned')
                .setDescription('Get owned games for a Steam user.')
                .addStringOption(option => 
                    option.setName('steamid')
                    .setDescription('SteamID64 of the account.')
                    .setRequired(true)
                )
            )
            .addSubcommand(subcommand => 
                subcommand.setName('recent')
                .setDescription('Get recently played games for a Steam user.')
                .addStringOption(option => 
                    option.setName('steamid')
                    .setDescription('SteamID64 of the account.')
                    .setRequired(true)
                )
            )
        )
        .addSubcommandGroup(group => 
            group.setName('game')
            .setDescription('Game related commands')
            .addSubcommand(subcommand => 
                subcommand.setName('news')
                .setDescription('Get news for a Steam game.')
                .addStringOption(option => 
                    option.setName('appid')
                    .setDescription('AppId of the game.')
                    .setRequired(true)
                )
            )
        ),
    async execute(interaction) {
        const group = interaction.options.getSubcommandGroup();

        await interaction.deferReply({
            ephemeral: true
        });

        switch (group) {
            case 'game': {
                await handleGame(interaction);
                break;
            }
            case 'player': {
                await handlePlayer(interaction);
                break;
            }
        }
    }
}