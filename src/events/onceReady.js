const setActivity = require('./onceReady/setActivity');

module.exports = function(client) {
    setActivity(client);
}