const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");

const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // 1. Prefix Commands Loading
    const commandFiles = await globPromise(`${process.cwd()}/src/commands/**/*.js`);
    commandFiles.forEach((value) => {
        const file = require(value);
        const splitted = value.split(/[\\/]/);
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // 2. Events Loading
    const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
    eventFiles.forEach((value) => require(value));

    // 3. Slash Commands Loading & Registration
    const arrayOfSlashCommands = [];
    const slashCommandFiles = await globPromise(`${process.cwd()}/src/slashCommands/**/*.js`);
    
    slashCommandFiles.forEach((value) => {
        const file = require(value);
        if (file?.name) {
            client.slashCommands.set(file.name, file);

            if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
            arrayOfSlashCommands.push(file);
        }
    });

    // 4. Auto Register Slash Commands on Ready
    client.on("ready", async () => {
        try {
            await client.application.commands.set(arrayOfSlashCommands);
            console.log("Successfully registered all Slash Commands globally!");
        } catch (error) {
            console.error("Failed to register Slash Commands:", error);
        }
    });

    // 5. MongoDB Connection
    const mongoUrl = client.config.mongo;
    if (mongoUrl) {
        mongoose.connect(mongoUrl).then(() => {
            console.log("Connected to MongoDB database!");
        }).catch((err) => {
            console.error("MongoDB Connection Error:", err);
        });
    }
};
