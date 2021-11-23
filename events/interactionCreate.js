module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.user.bot) return; // do not respond to bots
        if (!interaction.isCommand() && !interaction.isButton()) return; // is it a command or button?

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return; // exit if the command does not exist

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command.',
                ephemeral: true
            });
        }
    }
};