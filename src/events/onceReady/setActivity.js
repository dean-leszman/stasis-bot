const config = require('../../../config.json');

module.exports = function(client) {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`)

    let { activity, debug } = config;

    if (debug) {
        console.log(`--- DEBUG MODE ---`);
        client.user.setActivity(activity + " | DEBUG");
    } else {
        client.user.setActivity(activity);
    }
}