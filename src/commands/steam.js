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
async function Steam_GetSteamLevel(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamid: steamid
    });

    const api = IPlayerService.GetSteamLevel + queryString;
    return await SteamAPI(api);
}

/**
 * Get summary of the account
 * @param {*} steamid SteamID64
 */
async function Steam_GetPlayerSummaries(steamid) {
    const queryString = generateQueryString({
        key: STEAM_API_KEY,
        steamids: steamid
    });

    const api = ISteamUser.GetPlayerSummaries + queryString;
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
async function getPlayerSummary(interaction) {
    const steamid = interaction.options.getString('steamid');
    const summary = (await Steam_GetPlayerSummaries(steamid)).response;
    const games = (await Steam_GetOwnedGames(steamid)).response;
    const recent = (await Steam_GetRecentlyPlayedGames(steamid)).response;
    const level = (await Steam_GetSteamLevel(steamid)).response;

    if (
        (summary && summary.players && summary.players.length > 0) &&
        (games && games.games && games.games.length > 0) &&
        (recent && recent.games && recent.games.length > 0) &&
        (level)
    ) {
        const player = summary.players[0];

        const name = player.personaname;
        const avatar = player.avatarfull;
        const url = player.profileurl;
        const lastLogOff = player.lastlogoff;
        const status = getPlayerStatus(player.personastate);
        const created = player.timecreated;
        const playerLevel = level.player_level;

        let mostPlayed = '';
        games.games.sort((a, b) => b.playtime_forever - a.playtime_forever)
            .slice(0, 10)
            .map(game => {
                mostPlayed += `**${game.name}** - ${Math.round(game.playtime_forever / 60)} hours\n`;
            });

        let recentlyPlayed = '';
        recent.games.sort((a, b) => b.playtime_2weeks - a.playtime_2weeks)
            .slice(0, 5)
            .map(game => {
                recentlyPlayed += `**${game.name}** - ${Math.round(game.playtime_2weeks / 60)} hours\n`;
            });

        const embed = new MessageEmbed()
            .setAuthor(`${name} - Level ${playerLevel}`, avatar, url)
            .setTitle(`Steam Account Summary`)
            .setDescription(
                `**__Total Games Owned__**\n` +
                `${games.game_count}\n\n` +

                `**__Most Played Games__**\n` +
                mostPlayed + `\n` +

                `**__Recently Played Games__** (*Past 2 weeks*)\n` +
                recentlyPlayed + `\n` +
                
                `**__Created__**\n` +
                `${new Date(created).toLocaleString('en-GB')}`
            )
            .setFooter(`Currently ${status}${status === 'Offline' ? " - Last seen " + new Date(lastLogOff * 1000).toLocaleString('en-GB') : ""}`)
            .setColor(colors.teal);

        await interaction.editReply({
            embeds: [embed]
        });
    } else {
        await interaction.editReply({
            content: '[Error] Unable to fetch details for this user.'
        });
    }
}

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
        )
        .addSubcommand(subcommand =>
            subcommand.setName('player')
            .setDescription('Get a summary of a Steam user.')
            .addStringOption(option => 
                option.setName('steamid')
                .setDescription('SteamID64 of the user.')
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
            case 'player': {
                await getPlayerSummary(interaction);
                break;
            }
        }
    }
}