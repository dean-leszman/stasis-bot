const { joinRoles } = require('../data/Roles');

module.exports = {
    name: 'guildMemberAdd',
    async execute(guildMember) {
        console.log(`${guildMember.displayName} has joined the server.`)
        guildMember.roles.set(joinRoles, "Join roles");
    }
};