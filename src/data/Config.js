module.exports = {
    SERVER: {
        logChannel: '552985239174250517'
    },
    BOTCOMMANDS: ["bot-commands"],
    DEV: ["bot-magic"],
    CHANNEL: { // 
        categoryName: 'Voice',
        deleteTimeout: 15 // delete channel after n seconds if it is empty
    },
    RULES: [{
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
    TEXTCHANNELS: [
        "628924169630777363", // Destiny
        "808380003951575060", // Eco
        "791662222082310175", // Escape From Tarkov
        "447047848652177408", // Final Fantasy
        "619493278164975618", // Path of Exile
    ],
    VOICECHANNELS: [ // Names of voice channels that should not be deleted
        "🔇 A Quiet Place",
        "Channel Creator",
        "Big Boi Lounge"
    ]
}