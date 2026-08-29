const client = require("../../index");

client.on("messageCreate", async (message) => {
    // Ignore bots and DM messages
    if (message.author.bot || !message.guild) return;

    // Fallback prefix if config prefix is missing
    const prefix = (client.config && client.config.prefix) ? client.config.prefix : "!";

    // Check if message starts with prefix or bot mention
    const mentionPrefix = new RegExp(`^<@!?${client.user.id}>((\\s+.)|(\\s*)$)`);
    
    let usedPrefix = false;
    if (message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
        usedPrefix = prefix;
    } else if (mentionPrefix.test(message.content)) {
        usedPrefix = message.content.match(mentionPrefix)[0];
    }

    if (!usedPrefix) return;

    // Slice prefix and split arguments
    const args = message.content.slice(usedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift()?.toLowerCase();

    if (!cmd) return;

    // Find command by name or alias
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

    if (!command) {
        return message.channel.send({
            embeds: [{
                description: "❌ | Command not found!",
                color: 0x2f3136
            }]
        }).then(m => {
            setTimeout(() => {
                m.delete().catch(() => {});
            }, 6000);
        }).catch(() => {});
    }

    // Execute Command
    try {
        await command.run(client, message, args);
    } catch (error) {
        console.error(`Error executing command ${cmd}:`, error);
        message.channel.send({ content: "An error occurred while executing this command." }).catch(() => {});
    }
});
