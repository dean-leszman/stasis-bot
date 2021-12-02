module.exports = {
    IPlayerService: {
        GetOwnedGames: 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/',
        GetRecentlyPlayedGames: 'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/',
        GetSteamLevel: 'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/'
    },
    ISteamUser: {
        GetPlayerSummaries: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',
        ResolveVanityUrl: 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/'
    }
}