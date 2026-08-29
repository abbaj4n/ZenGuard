const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "antinuke",
    aliases: ["an", "anti-nuke"],
    description: "Configures full server antinuke protection system",
    run: async (client, message, args) => {
        // Only Server Owner or Bot Owners can use this
        const isOwner = message.guild.ownerId === message.author.id || (client.config.owners && client.config.owners.includes(message.author.id));
        
        if (!isOwner) {
            return message.channel.send({
                embeds: [{
                    description: "❌ | Only the **Server Owner** or **Bot Owner** can configure Antinuke settings!",
                    color: 0xff0000
                }]
            });
        }

        const option = args[0]?.toLowerCase();

        // 1. Help / Options Menu
        if (!option) {
            return message.channel.send({
                embeds: [{
                    title: "🛡️ ZenGuard Antinuke System",
                    description: "Complete Server Anti-Nuke & Anti-Raid Protection",
                    color: 0x2f3136,
                    fields: [
                        {
                            name: "⚙️ Setup Commands",
                            value: "`!antinuke enable` - Enable full server protection\n`!antinuke disable` - Disable antinuke protection\n`!antinuke status` - Check current protection status",
                            inline: false
                        },
                        {
                            name: "🔒 Active Modules Covered",
                            value: "• Anti-Channel Delete / Create\n• Anti-Role Delete / Create\n• Anti-Member Kick / Ban\n• Anti-Bot Addition\n• Anti-Webhook Create / Delete",
                            inline: false
                        }
                    ],
                    footer: { text: `Security System || ${client.bot}` }
                }]
            });
        }

        // Database Schema Simulation / In-Memory State
        if (!client.antinuke) client.antinuke = new Map();

        // 2. Enable Antinuke
        if (option === "enable" || option === "on") {
            client.antinuke.set(message.guild.id, true);
            return message.channel.send({
                embeds: [{
                    title: "✅ Antinuke Enabled Successfully!",
                    description: "All antinuke features are now **ACTIVE**. Unauthorized actions will result in an instant **Kick/Ban** of the executor.",
                    color: 0x00ff00,
                    footer: { text: "ZenGuard Security Protocol Activated" }
                }]
            });
        }

        // 3. Disable Antinuke
        if (option === "disable" || option === "off") {
            client.antinuke.set(message.guild.id, false);
            return message.channel.send({
                embeds: [{
                    title: "⚠️ Antinuke Disabled",
                    description: "Antinuke protection has been **OFF**. Your server is no longer protected against unauthorized mass actions.",
                    color: 0xff0000
                }]
            });
        }

        // 4. Status Check
        if (option === "status" || option === "stats") {
            const isEnabled = client.antinuke.get(message.guild.id) ?? false;
            return message.channel.send({
                embeds: [{
                    title: "📊 Antinuke Status",
                    description: `Current Antinuke Protection: **${isEnabled ? "🟢 ENABLED" : "🔴 DISABLED"}**`,
                    color: isEnabled ? 0x00ff00 : 0xff0000
                }]
            });
        }

        // Default Invalid Sub-Command
        return message.channel.send({ content: "❌ | Invalid option! Use `!antinuke` to see available settings." });
    }
};
