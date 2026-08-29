module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Displays the help menu",
    run: async (client, message, args) => {
        try {
            await message.channel.send({
                embeds: [{
                    title: "🛡️ ZenGuard Help Menu",
                    description: "Welcome! Here are the available commands:",
                    color: 0x2f3136,
                    fields: [
                        {
                            name: "⚙️ General",
                            value: "`!ping` - Check bot latency\n`!help` - Display this menu"
                        }
                    ],
                    footer: {
                        text: `Requested by ${message.author.username}`
                    }
                }]
            });
        } catch (err) {
            console.error("Help command error:", err);
            message.channel.send({ content: "❌ | Could not load help menu!" }).catch(() => {});
        }
    }
};
