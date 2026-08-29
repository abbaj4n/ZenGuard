const { Client, Intents, Collection } = require("discord.js");
require('dotenv').config();
const { RateLimiter } = require(`discord.js-rate-limiter`);

const client = new Client({
    intents: 3276799,
});

module.exports = client;

let rateLimiter = new RateLimiter(1, 5000);

// Safe Config Initialization
let config = {};
try {
    config = require("./config.json");
} catch (e) {
    config = {};
}

// Config Setup with Fallbacks
client.config = {
    token: process.env.TOKEN || config.token,
    mongo: process.env.MONGO || process.env.MONGO_URI || config.mongo,
    prefix: process.env.PREFIX || config.prefix || "!",
    owners: process.env.OWNER_ID ? [process.env.OWNER_ID] : (config.owners || []),
    botname: process.env.BOT_NAME || config.botname || "ZenGuard",
    embedColor: process.env.EMBED_COLOR || config.embedColor || "#2f3136",
    support: process.env.SUPPORT_SERVER || config.support || "https://discord.gg",
    website: process.env.WEBSITE || config.website || "https://google.com"
};

// Global Variables & Standard Emoji Fallbacks (Fixes Error 50035)
client.commands = new Collection();
client.slashCommands = new Collection();
client.error = '❌ |';
client.success = '✅ |';
client.bot = client.config.botname;

// Handler Connection
require("./src/handler")(client);

// Safe Discord Login
if (!client.config.token) {
    console.error("FATAL ERROR: Discord Bot Token is missing in Variables or config.json!");
} else {
    client.login(client.config.token);
}
