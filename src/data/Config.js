module.exports = {
    server: {
        logChannel: '552985239174250517'
    },
    botCommandChannels: ["bot-commands"],
    devChannels: ["bot-magic"],
    channel: { // 
        categoryName: 'Voice',
        deleteTimeout: 15 // delete channel after n seconds if it is empty
    },
    rules: [{
        name: "**Use Common Sense**",
        value: "The server staff aren't here to babysit you. Keep it sensible."
    }, {
        name: "**Spamming**",
        value: "Don't spam: chat, emojis, caps, etc."
    }, {
        name: "**Advertising**",
        value: "Have your own server? Fantastic! We don't want to know about it here. If you want an exception to this, ask a staff member."
    }, {
        name: "**Nicknames & Avatars**",
        value: "Please keep your name / avatar sensible. If it's inappropriate, you will be kicked."
    }, {
        name: "**English Only**",
        value: "Whilst we appreciate the community is made up of members from a multitude of countries, please keep chat to English."
    }, {
        name: "**Immigration Control**",
        value: "All traffic through the border must present a valid citizen identity card or visa permit."
    }],
    textChannels: "628924587702222868", // Games category
    voiceChannels: [ // Names of voice channels that should not be deleted
        "Channel Creator",
        "Big Boi Lounge"
    ],
    voiceChannelCreator: "Channel Creator" // Name of voice channel that a member should join to automatically create their own channel
}