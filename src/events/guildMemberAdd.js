const { JOIN: joinRoles } = require('../data/Roles');

module.exports = {
    name: 'guildMemberAdd',
    execute(guildMember) {
        guildMember.roles.set(joinRoles, "Join roles");
    }
};