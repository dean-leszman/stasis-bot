const { roleMention, SlashCommandBuilder } = require('@discordjs/builders');

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
                await interaction.reply({
                    content: 'https://c.tenor.com/l2hbENFhHAoAAAAd/guy-in-black-shirt-thirsty.gif'
                });
                break;
            }
            case 'thirsty': {
                await interaction.reply({
                    content: 'https://c.tenor.com/Nogfer0y4r8AAAAC/dying-hungry-and-thirstya.gif'
                });
                break;
            }
            default: {
                break;
            }
        }
    }
};