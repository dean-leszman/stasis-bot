const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const BOMB_RATIO = 0.2;
const MAX_SIZE = 9;

module.exports = class MinesweeperCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'minesweeper',
            aliases: ['mine', 'mines'],
            group: 'misc',
            memberName: 'minesweeper',
            description: 'Play a round of minesweeper',
            examples: ["\`!minesweeper <grid_size> <bomb_count>\` - \`!minesweeper\`, \`!minesweeper 10\`, \`!minesweeper 10 5\`"],
            throttling: {
                usages: 1,
                duration: 10
            },
            args: [{
                key: 'size',
                prompt: `Please enter the size of grid (max ${MAX_SIZE})`,
                type: 'string',
                default: 5,
                validate: size => {
                    const valid = size > 0 && size <= MAX_SIZE || size === "help";
                    if (valid) return true;

                    return `size must be between 1 and ${MAX_SIZE}.`;
                }
            }, {
                key: 'bombs',
                prompt: 'Please enter the number of bombs',
                type: 'integer',
                default: 5
            }]
        });
    }

    run(message, { size = 5, bombs = 5 }) {
        if (size === "help") {
            return message.embed(
                new MessageEmbed()
                    .setTitle("**Minesweeper Help**")
                    .addFields([{
                        name: "Command Syntax",
                        value: "\`!minesweeper [grid_size = 5] [bomb_count = 5]\`"
                    }, {
                        name: "Example Usage",
                        value: "\`!minesweeper\` | \`!minesweeper 8\` | \`!minesweeper 6 5\`"
                    }])
            );
        }

        let grid = [];

        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(0);
            }
            grid.push(row);
        }

        let bombsPlaced = 0;
        let maxBombs = bombs ? bombs : Math.floor(Math.pow(size, 2) * BOMB_RATIO);
        while (bombsPlaced < maxBombs) {
            const randX = Math.floor(Math.random() * size);
            const randY = Math.floor(Math.random() * size);

            if (grid[randX][randY] === 0) {
                grid[randX][randY] = 9;
                bombsPlaced++;
            }
        }

        for (let j = 0; j < size; j++) {
            let counter = 0;
            for (let i = 0; i < size; i++) {
                if (grid[i][j] !== 9) {
                    if (i > 0 && j > 0 && grid[i - 1][j - 1] === 9) { // top left
                        grid[i][j] = grid[i][j] + 1;
                    }

                    if (j > 0 && grid[i][j - 1] === 9) { // top middle
                        grid[i][j] = grid[i][j] + 1;
                    }

                    if (i < size - 1 && j > 0 && grid[i + 1][j - 1] === 9) { // top right
                        grid[i][j] = grid[i][j] + 1;
                    }

                    if (i > 0 && grid[i - 1][j] === 9) { // middle left
                        grid[i][j] = grid[i][j] + 1;
                    }

                    if (i < size - 1 && grid[i + 1][j] === 9) { // middle right
                        grid[i][j] = grid[i][j] + 1;
                    }

                    if (i > 0 && j < size - 1 && grid[i - 1][j + 1] === 9) { // bottom left
                        grid[i][j] = grid[i][j] + 1;
                    }

                    if (j < size - 1 && grid[i][j + 1] === 9) { // bottom middle
                        grid[i][j] = grid[i][j] + 1;
                    }

                    if (i < size - 1 && j < size - 1 && grid[i + 1][j + 1] === 9) { // bottom right
                        grid[i][j] = grid[i][j] + 1;
                    }
                }
            }
        }

        let response = "**MINESWEEPER** (*" + bombsPlaced + " bombs*)";
        for (let j = 0; j < size; j++) {
            response += "\n";

            for (let i = 0; i < size; i++) {
                switch (grid[i][j]) {
                    case 0:
                        response += "||:zero:||";
                        break;
                    case 1:
                        response += "||:one:||";
                        break;
                    case 2:
                        response += "||:two:||";
                        break;
                    case 3:
                        response += "||:three:||";
                        break;
                    case 4:
                        response += "||:four:||";
                        break;
                    case 5:
                        response += "||:five:||";
                        break;
                    case 6:
                        response += "||:six:||";
                        break;
                    case 7:
                        response += "||:seven:||";
                        break;
                    case 8:
                        response += "||:eight:||";
                        break;
                    case 9:
                        response += "||:bomb:||";
                        break;
                }
            }
        }

        message.delete();

        return message.say(response);
    }
}