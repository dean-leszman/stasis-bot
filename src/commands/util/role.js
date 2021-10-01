const { Command } = require('discord.js-commando');

const { getBaseEmbed } = require("../../util");

const roles = require("../../data/Stasis/Roles");

module.exports = class RoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'role',
            group: 'util',
            memberName: 'role',
            description: 'Join a role',
            aliases: ["roles", "join"],
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [{
                key: 'roleName',
                prompt: 'Plase type the name of the role you want.',
                type: 'string',
                default: ''
            }]
        });

        this.getRoles = this.getRoles.bind(this);
        this.getRoleHelp = this.getRoleHelp.bind(this);
        this.parseRole = this.parseRole.bind(this);
        this.setUserRole = this.setUserRole.bind(this);

        this.message = null;
    }

    getRoleHelp() {
        const embed = getBaseEmbed();

        embed.setTitle("Role Help");
        embed.setDescription("Join a role.");
        embed.addFields({
            name: "**Command Usage**",
            value: "`!role <role name>` - Join role\n" +
                "`!role help` - View role help\n" +
                "`!role colors` - View color roles\n" +
                "`!role games` - View game roles\n"
        });
        embed.setFooter("Aliases: !role | !roles | !join")

        this.message.embed(embed);
    }

    getRoles(rolesType = roles.COLORS) {
        const embed = getBaseEmbed();

        let rolesString = "";

        Object.keys(rolesType).forEach((key) => {
            rolesString += `<@&${rolesType[key]}>\n`;
        });

        embed.setTitle("Available Roles");
        embed.setDescription(rolesString);

        this.message.embed(embed);
    }

    parseRole(roleName) {
        const found = Object.keys(roles).some(key => {
            if (roles[key][roleName]) {
                this.setUserRole(roles[key][roleName]);
                return true;
            }
        });

        if (found === false) {
            this.message.say(`Unable to find role: \`${roleName}\``);
        }
    }

    setUserRole(roleId) {
        const role = this.message.guild.roles.cache.find(r => r.id === roleId);

        const member = this.message.guild.members.cache.find(m => m.id === this.message.author.id);
        const hasRole = member.roles.cache.find(r => r.id === roleId);

        if (hasRole) {
            member.roles.remove(role)
            .then(() => {
                this.message.say(`<@${member.id}>, you've been removed from ${role.name}.`);
            })
            .catch(error => {
                this.message.say("Failed to remove role.");
                console.error(error);
            });
        } else {
            member.roles.add(role)
            .then(() => {
                this.message.say(`<@${member.id}>, you've been added to ${role.name}.`);
            })
            .catch(error => {
                this.message.say("Failed to add role.");
                console.error(error);
            });
        }
    }

    run(message, { roleName }) {
        this.message = message;

        const role = roleName.replace(/\s/g, "").toUpperCase();
        switch (role) {
            case "COLORS":
            case "COLOURS":
                return this.getRoles(roles.COLORS);
            case "GAME":
            case "GAMES":
                return this.getRoles(roles.GAMES);
            case "HELP":
            case "":
                return this.getRoleHelp();
            default:
                return this.parseRole(role);
        }
    }
}