require('dotenv').config();
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Removing application (/) guild commands.');
        
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
        .then(() => { console.log('Successfully removed application (/) guild commands.')});
    } catch (error) {
        console.error(error);
    }
})();