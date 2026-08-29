const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Displays the bot help menu",
    run: async (client, message, args) => {
        const prefix = client.config.prefix || "!";
        
        return message.channel.send({
            embeds: [{
                title: `${client.bot || "ZenGuard"} || Help Menu`,
                description: `Welcome to **${client.bot || "ZenGuard"}**!\nUse \`${prefix}\` before any command.`,
                color: 0x2f3136,
                fields: [
                    {
                        name: "📌 General Commands",
                        value: "`ping`, `help`",
                        inline: false
                    }
                ],
                footer: {
                    text: `Requested by ${message.author.tag}`,
                    icon_url: message.author.displayAvatarURL({ dynamic: true })
                }
            }]
        });
    }
};
