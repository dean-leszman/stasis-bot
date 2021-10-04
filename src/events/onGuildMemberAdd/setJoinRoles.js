const { JOINROLES } = require('../../data/Stasis/Server');

module.exports = function(member) {
    member.roles.set(JOINROLES);
}