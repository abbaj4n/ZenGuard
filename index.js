const { Client, Intents, Collection } = require("discord.js");
require('dotenv').config();
const { RateLimiter } = require(`discord.js-rate-limiter`);

const client = new Client({
    intents: 3276799,
});

module.exports = client;

let rateLimiter = new RateLimiter(1, 5000);

// Config Setup with Environment Variable Fallback
const config = require("./config.json");

client.config = {
    token: process.env.TOKEN || config.token,
    mongo: process.env.MONGO || process.env.MONGO_URI || config.mongo,
    prefix: process.env.PREFIX || config.prefix || "!",
    owners: process.env.OWNER_ID ? [process.env.OWNER_ID] : (config.owners || []),
    botname: process.env.BOT_NAME || config.botname || "ZenGuard"
};

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.error = '<:error:999937685877702696> |';
client.bot = client.config.botname;
client.success = '<:success:999936552362856478> |';

// Handler Connection
require("./src/handler")(client);

// Login using Config Token or ENV Token
client.login(client.config.token);
