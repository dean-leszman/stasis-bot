const channelGenerator = require('./onVoiceStateUpdate/channelGenerator');

module.exports = function(oldState, newState) {
    channelGenerator(oldState, newState);
};