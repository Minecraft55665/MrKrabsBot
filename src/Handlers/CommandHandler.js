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

    const commandsTable = new Array();

    const { jsFiles, parentDirs } = await loadFiles("Commands");

    for (const file of jsFiles) {
        try {
            const command = await import(file);
            const command_ = command.default;

            const properties = { parentDirs, file };

            client.commands.set(command_.data.name, properties);

            commandsTable.push({
                Command: command_.data.name,
                Status: `Loaded`,
            });
            commands.push(command_.data.toJSON());
        } catch (error) {
            commandsTable.push({ Command: file.split("/").pop().slice(0, -3) });
            throw error;
        }
    }

    client.application.commands.set(commands);

    console.table(commandsTable, ["Command", "Status"]);
    console.info("%s\x1b[0m", chalk.green(`Loaded Commands`));
    console.timeEnd("Commands Loaded");
}
