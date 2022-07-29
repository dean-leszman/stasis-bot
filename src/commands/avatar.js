const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');

function getGuildAvatar(interaction) {
    return interaction.guild.iconURL();
}

function getMemberAvatar(interaction) {
    const member = interaction.options.getMember('user');
    return member.displayAvatarURL();
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get an avatar')
        .addSubcommand(cmd => 
            cmd.setName('user')
            .setDescription('Get a user\'s avatar ')
            .addUserOption(option =>
                option.setName('user')
                .setDescription('The user you want to get the avatar from')
                .setRequired(true)
            )
        )
        .addSubcommand(cmd =>
            cmd.setName('server')
            .setDescription('Get the server\'s avatar')
        ),
    async execute(interaction) {
        let avatar;

        switch (interaction.options.getSubcommand()) {
            case 'server': {
                avatar = getGuildAvatar(interaction);
                break;
            }

            case 'user': {
                avatar = getMemberAvatar(interaction);
                break;
            }
        }

        image = new AttachmentBuilder(avatar);
        interaction.reply({
            files: [image]
        });
    },
    channels: ['bot-commands']
}