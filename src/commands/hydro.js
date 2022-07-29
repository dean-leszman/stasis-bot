const { SlashCommandBuilder } = require('discord.js');
const { roleMention } = require('@discordjs/builders');
const { drink, thirsty } = require('../data/Hydro');

const roleName = "Hydrohomie";
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hydro')
        .setDescription('Hydrohomies unite!')
        .addSubcommand(subcommand =>
            subcommand.setName('check')
            .setDescription('Hydro check!')
        )
        .addSubcommand(subcommand => 
            subcommand.setName('drink')
            .setDescription('Chug down that bottle!')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('thirsty')
            .setDescription('I need a drink!')
        ),
    async execute(interaction) {
        const isHydroHomie = interaction.member.roles.cache.find(role => role.name === roleName);

        if (!isHydroHomie) {
            await interaction.reply({
                content: 'You are not a hydrohomie. Get outta here with your yellow piss!'
            });
            return;
        }
        switch (interaction.options.getSubcommand()) {
            case 'check': {
                const hydroRole = interaction.guild.roles.cache.find(role => role.name === roleName);
                let message = 'Hydro check!';
                if (hydroRole !== null) {
                    message = `${roleMention(hydroRole.id)} ${message}`;
                }

                await interaction.reply({
                    content: message,
                    allowedMentions: {
                        roles: [hydroRole.id]
                    }
                });
                break;
            }
            case 'drink': {
                const response = drink[Math.floor(Math.random() * drink.length)];
                await interaction.reply({
                    content: response
                });
                break;
            }
            case 'thirsty': {
                const response = thirsty[Math.floor(Math.random() * thirsty.length)];
                await interaction.reply({
                    content: response
                });
                break;
            }
            default: {
                break;
            }
        }
    }
}