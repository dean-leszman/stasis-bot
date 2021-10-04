const setJoinRoles = require('./onGuildMemberAdd/setJoinRoles');
module.exports = (client, member) => {
    setJoinRoles(member);
}