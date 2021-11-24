const config = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is ready.`);
    }
};