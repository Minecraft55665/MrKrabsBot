import { loadFiles } from "../Functions/index.js";
import { ExtendedClient } from "../Base/index.js";
import chalk from "chalk";

// By Lyxcode (https://youtube.com/@lyx)
/**
 * @param {ExtendedClient} client
 * @return {Promise<void>}
 */
export async function loadCommands(client) {
    console.time("Commands Loaded");

    client.commands = new Map();
    const commands = new Array();

    const files = await loadFiles("Commands");

    for (const file of files) {
        try {
            const command = require(file);
            const command_ = command.default;
            const execute = (interaction, client) =>
                command_.execute(interaction, client);

            client.commands.set(command_.data.name, execute);

            commands.push({ Command: command_.data.name, Status: `Loaded` });
        } catch (error) {
            commands.push({
                Command: file.split("/").pop().slice(0, -3),
                Status: `Error`,
            });
            throw error;
        }

        client.application.commands.set(commands);

        console.table(commands, ["Command", "Status"]);
        console.info("%s\x1b[0m", chalk.green(`Loaded Commands`));
        console.time("Commands Loaded");
    }
}
