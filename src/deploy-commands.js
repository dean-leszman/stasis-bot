require('dotenv').config();
const fs = require('fs');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.disabled === true) {
        continue;
    }
    commands.push(command.data.toJSON());
}

(async () => {
    try {
        console.log('Registering application (/) guild commands.');
        
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
        .then(() => { console.log('Successfully registered application (/) guild commands.')});
    } catch (error) {
        console.error(error);
    }
})();
