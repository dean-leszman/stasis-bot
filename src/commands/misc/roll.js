const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

function getRandomInt(max) {
    let result = Math.ceil(Math.random() * Math.floor(max));
    
    if (max == 100) {
        if (result % 10 === 0) {
            result = Math.ceil(result / 10) * 10;
        } else {
            result = Math.ceil((result + 1) / 10) * 10;
        }
    }

    return result;
}

function getDiceRoll(value, repetitions, modifier) {
    if (repetitions > 25) return `I'm not rolling over 25 dice, you fool.`;

    let total = [];
    for (var i = 0; i < repetitions; i++) {
        const roll = getRandomInt(value);
        total.push(roll);
    }

    let rolls = '';
    total.map((value, i) => {
        if (i === 0) {
            rolls += `${value}`;
        } else {
            rolls += `, ${value}`;
        }
    })

    let result = total.reduce((x, y) => x + y, 0) + modifier;
    let response = `${result} (${rolls}) ${modifier ? '[' + (modifier >= 0 ? '+' : '') + modifier + ']' : ''}`;

    return  response;
}

function getHelp() {
    return new MessageEmbed()
    .setTitle('**Roll Help**')
    .setDescription('Roll one or more dice.\nSupports repeated rolls, number of dice, value of dice, and modifier.')
    .addFields({
        name: '`!roll\`',
        value: 'View the Roll help.'
    }, {
        name: '`!roll d100`',
        value: 'Roll a d100 (d100)'
    }, {
        name: '`!roll 3d12`',
        value: 'Roll three d12s (d12 + d12 + d12)'
    }, {
        name: '`!roll 2d8+5`',
        value: 'Roll two d8s and adds five (d8 + d8 + 5)'
    }, {
        name: '`!roll 2x1d6`',
        value: 'Roll a d6 twice (d6, d6)'
    }, {
        name: '`!roll 3x2d4+5`',
        value: 'Roll two d4s and add five three times (d4 + 5, d4 + 5, d4 + 5)'
    })
    .setFooter('Aliases: !dice')
    .setColor(0x48C9B0);
}

module.exports = class RollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            aliases: ['dice'],
            group: 'misc',
            memberName: 'roll',
            description: 'Roll one or more dice. Supports repeated rolls, number of dice, value of dice, and modifier.',
            throttling: {
                usages: 1,
                duration: 3
            },
            examples: ['!roll 6', '!roll d8', '!roll 2d10'],
            args: [{
                key: 'type',
                prompt: 'What type of dice do you want to roll? `!roll [repetitions:x][count][d]<value>[+modifier]` (e.g. `!roll 2d6` | `!roll 2x3d6+2`)',
                type: 'string',
                default: ''
            }],
            validate: (type) => { return type.test(/(((((\d*)x*)d*)\d+)([\+\-]*\d+))|(\s)/); }
        });
    }

    run(message, { type }) {
        if (!type) {
            return message.embed(getHelp());
        };

        const repetitionsMatch = type.match(/([0-9])(?:x)/);
        const repetitions = repetitionsMatch ? repetitionsMatch[1] : 1;

        const dice = type.match(/[0-9]*d[0-9]+/);
        
        if (dice) {
            const rolls = dice[0].match(/([0-9]*)(?:d)/)[1] || 1;
            const value = dice[0].match(/(?:d)([0-9]+)/)[1];

            const modifierParam = type.match(/\+[0-9]+|\-[0-9]+/);
            const modifier = parseInt(modifierParam) || 0;

            const validRepetitions = (repetitions && repetitions > 0 && repetitions <= 5);
            const validRolls = (rolls && rolls > 0 && rolls <= 10);
            const validValue = (value && value > 0 && value <= 100);
            const validModifier = (modifier === 0 || (modifier && modifier >= -100 && modifier <= 100));

            if (validRepetitions && validRolls && validValue && validModifier) {
                let response = '';

                for (var i = 0; i < repetitions; i++) {
                    const result = getDiceRoll(value, rolls, modifier);
                    const rollNumber = i + 1;
                    response += `Roll ${rollNumber}: ${result}\n`;
                }

                message.say('Rolling...')
                .then(msg => {
                    setTimeout(() => { 
                        msg.edit(response);
                    }, 1000)
                });
            } else {
                message.say(`Sorry, I can't roll that.`);
            }
        } else {
            return message.say(`Sorry, I don't know how to roll that.`);
        }
    }
}