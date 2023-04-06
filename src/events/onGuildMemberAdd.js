module.exports = {
    name: 'guildMemberAdd',
    async execute(guildMember) {
        console.log(`${guildMember.displayName} has joined the server.`)
    }
};