const { Command } = require('discord.js-commando');

const responses = [
    "12 Years A REKT",
    "2Girls1REKT",
    "50 Shades of REKT",
    "AntREKTica",
    "Ashes to ashes, REKT to REKT",
    "BatREKT Begins",
    "BREKTheart",
    "BREKTxit",
    "Close Encounters of the REKT Kind",
    "Darwin ProjREKT",
    "DetREKT: Become Human",
    "Deep REKT Galactic",
    "Dr REKTyll and Mr Hyde",
    "Eat. Sleep. REKT. Repeat.",
    "EREKTile dysfunction",
    "ET: The Extra TerreREKTrial",
    "Escape From REKTov",
    "Final REKTasy XIV",
    "Final Fantasy XIV: A REKT Reborn",
    "Final Fantasy XIV: HeavensREKT",
    "Final Fantasy XIV: StormREKT",
    "Final Fantasy XIV: ShadowREKTers",
    "ForREKT Gump",
    "From REKTa With Love",
    "GladiREKTor",
    "Grand REKT Auto",
    "Great REKTspectations",
    "Harry Potter and the Half-REKT Prince",
    "Halo: The Master REKT Collection",
    "Hellblade: Senua's REKTifice",
    "Left 4 REKT 2",
    "Metro: Last Last REKTdux",
    "MOM! GET THE CAMREKT",
    "Not REKT",
    "Papers, REKT",
    "Pokemon: Fire REKT",
    "Really REKT",
    "REKT",
    "REKT and Morty",
    "REKT and Roll",
    "REKT and Stone, brother!",
    "REKT Kong",
    "REKT Stranding",
    "REKT, Paper, Scissors",
    "R.E.K.T.E.R",
    "REKT-E",
    "REKT-It Ralph",
    "REKT's Labyrinth",
    "REKTal exam",
    "REKTangle",
    "REKTbox Series X",
    "REKTcleor",
    "REKTcraft",
    "REKTflix",
    "REKTiny 2",
    "REKTium for a Dream",
    "REKTMAN",
    "REKTorio",
    "ResuREKT",
    "Saving Private REKTan",
    "School of REKT",
    "Secure. Contain. ProtREKT",
    "ShipREKT",
    "ShREKT",
    "SpiREKTed Away",
    "StellaREKT",
    "S.T.A.L.K.E.R: Clear Rekt",
    "Star TREKT",
    "Star Wars: Episode VI - Return of the REKT",
    "Star Wars: Knights of the REKT Republic",
    "The REKT Prince of Bel-Air",
    "The Good, the Bad, and the REKT",
    "The Lord of the REKTs",
    "The REKT Files",
    "The Silence of the REKT",
    "The Witcher 3: Wild REKT",
    "The Wolf of REKT Street",
    "Tomb REKTer",
    "Total REKTall",
    "Tyrannosaurus REKT",
    "WarfREKT",
    "We will, we will REKT you!",
    "Well and truly REKT",
    "Witness ProtREKTion",
    "Xbox Series REKT",
    "You have the REKT to remain silent",
];

function getRekt() {
    return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = class RektCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rekt',
            aliases: ['wrecked', 'rekd'],
            group: 'misc',
            memberName: 'wrecked',
            description: 'Brutal. Savage. Rekt.',
            throttling: {
                usages: 1,
                duration: 3
            }
        });
    }

    run(message) {
        return message.say(getRekt());
    }
}