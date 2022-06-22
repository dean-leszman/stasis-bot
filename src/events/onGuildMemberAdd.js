const { joinRoles } = require('../data/Roles');

module.exports = {
    name: 'guildMemberAdd',
    async execute(guildMember) {
        guildMember.roles.set(joinRoles, "Join roles");
    }
};