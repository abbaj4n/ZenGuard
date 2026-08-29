const { Client, Intents, Collection } = require("discord.js");
require('dotenv').config();
const { RateLimiter } = require(`discord.js-rate-limiter`);

const client = new Client({
    intents: 3276799,
});

module.exports = client;

let rateLimiter = new RateLimiter(1, 5000);

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.error = '<:error:999937685877702696> |';
client.bot = client.config.botname;
client.success = '<:success:999936552362856478> |';

// Handler Connection
require("./src/handler")(client);

// Direct Login using TOKEN from Railway Variables or .env
client.login(process.env.TOKEN);
