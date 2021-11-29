require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Removing application (/) guild commands.');
        
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
        .then(() => { console.log('Successfully removed application (/) guild commands.')})
        .catch(console.error);
    } catch (error) {
        console.error(error);
    }
})();
