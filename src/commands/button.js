const { 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Create a button')
        .addSubcommand(cmd => 
            cmd.setName('primary')
            .setDescription('Create a Primary button')
            .addStringOption(option =>
                option.setName('label')
                .setDescription('The label to display on this button')
                .setRequired(true)
            )
            .addBooleanOption(option => 
                option.setName('disabled')
                .setDescription('Whether to disable this button')
            )
        )
        .addSubcommand(cmd => 
            cmd.setName('secondary')
            .setDescription('Create a Secondary button')
            .addStringOption(option =>
                option.setName('label')
                .setDescription('The label to display on this button')
                .setRequired(true)
            )
            .addBooleanOption(option => 
                option.setName('disabled')
                .setDescription('Whether to disable this button')
            )
        )
        .addSubcommand(cmd => 
            cmd.setName('danger')
            .setDescription('Create a Danger button')
            .addStringOption(option =>
                option.setName('label')
                .setDescription('The label to display on this button')
                .setRequired(true)
            )
            .addBooleanOption(option => 
                option.setName('disabled')
                .setDescription('Whether to disable this button')
            )
        )
        .addSubcommand(cmd => 
            cmd.setName('link')
            .setDescription('Create a Link button')
            .addStringOption(option =>
                option.setName('label')
                .setDescription('The label to display on this button')
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('url')
                .setDescription('The URL to open when this button is clicked')
                .setRequired(true)
            )
            .addBooleanOption(option => 
                option.setName('disabled')
                .setDescription('Whether to disable this button')
            )
        )
        .addSubcommand(cmd => 
            cmd.setName('success')
            .setDescription('Create a Success button')
            .addStringOption(option =>
                option.setName('label')
                .setDescription('The label to display on this button')
                .setRequired(true)
            )
            .addBooleanOption(option => 
                option.setName('disabled')
                .setDescription('Whether to disable this button')
            )
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const buttonType = subcommand.slice(0, 1).toUpperCase() + subcommand.slice(1);
        const label = interaction.options.getString('label');
        const disabled = interaction.options.getBoolean('disabled') ?? false;

        const button = new ButtonBuilder()
            .setLabel(label)
            .setStyle(ButtonStyle[buttonType])
            .setDisabled(disabled);
        
        switch (buttonType) {
            case "Link": {
                const url = interaction.options.getString('url');

                try {
                    new URL(url); // parse URL
                    button.setURL(url); // if parsing does not throw an error then url should be valid
                } catch (err) {
                    console.error(err);
                    interaction.reply({
                        content: `There was a problem creating that button: ${err.message}`
                    });
                    return;
                }
                break;
            }
            default: {
                button.setCustomId(`${interaction.member.id}-${+new Date()}`);
            }
        }

        const row = new ActionRowBuilder()
            .addComponents(button);

        interaction.reply({
            components: [row]
        });
    }
}