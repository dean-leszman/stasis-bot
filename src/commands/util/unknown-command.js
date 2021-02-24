const { Command } = require('discord.js-commando');

module.exports = class UnknownCommandCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'unknown-command',
            group: 'util',
            memberName: 'unknown-command',
            description: 'Displays information when an unknown command is entered.',
            unknown: true,
            hidden: true
        });
    }

    run(message) {
    }
}