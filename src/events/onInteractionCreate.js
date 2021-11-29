function isAuthorised(memberPermissions, requiredPermissions) {
    return memberPermissions.has(requiredPermissions);
}

function checkPermissions(interaction, command) {
    // Check permissions
    if (typeof command.permissions !== 'undefined' && command.permissions instanceof Object) { // Does this command have permissions?
        const memberPermissions = interaction.memberPermissions;
        
        if (command.permissions.command !== 'undefined' && command.permissions.command instanceof Array) { // Are there permissions for the command itself?
            // Handle command permissions
            const requiredPermissions = command.permissions.command;
            if (!isAuthorised(memberPermissions, requiredPermissions)) return false;
        }

        const subcommand = interaction.options._subcommand !== null ? interaction.options.getSubcommand() : null;
        if (subcommand && command.permissions.subcommands && command.permissions.subcommands instanceof Object) { // Do any subcommands have permissions?
            if (command.permissions.subcommands[subcommand] !== 'undefined' && command.permissions.subcommands[subcommand] instanceof Array) { // Are there permissions for this subcommand?
                // Handle subcommand permissions
                const requiredPermissions = command.permissions.subcommands[subcommand];
                if (!isAuthorised(memberPermissions, requiredPermissions)) return false;
            }
        }
    }

    return true;
}

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.user.bot) return; // do not respond to bots
        if (!interaction.isCommand() && !interaction.isButton() && !interaction.isContextMenu()) return; // is it a command or button?

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return; // exit if the command does not exist

        try {
            const authorised = checkPermissions(interaction, command);
            if (!authorised) {
                await interaction.reply({
                    content: `You are not authorised to use this command.`,
                    ephemeral: true
                });
                return false;
            }

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