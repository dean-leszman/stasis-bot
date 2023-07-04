const { getTimestamp } = require('../util');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.user.bot) {
            return false; // do not allow bots
        }

        let command = interaction.client.commands.get(interaction.commandName);
        if (!command) return; // the command does not exist

        try {
            console.log(`${getTimestamp()} ${interaction.member.displayName} (${interaction.member.user.tag}) used '${interaction.commandName}'`);
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const response = {
                content: 'There was an error while executing this command.',
                ephemeral: true
            };

            await interaction.reply(response)
            .catch(() => {
                interaction.followUp(response);
            });
        }
    }
};