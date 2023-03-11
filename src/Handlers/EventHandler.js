import { loadFiles } from "../Functions/index.js";
// eslint-disable-next-line no-unused-vars
import { ExtendedClient } from "../Base/index.js";
import chalk from "chalk";

// By Lyxcode (https://youtube.com/@lyx)
/**
 * @param {ExtendedClient} client
 * @return {Promise<void>}
 */
export async function loadEvents(client) {
    console.time("Events Loaded");

    client.events = new Map();
    const events = new Array();

    const files = await loadFiles("Events", true);

    files.forEach(async (file) => {
        try {
            const event = await import(file);
            const execute = (...args) => event.execute(...args, client);
            const target = event.rest ? client.rest : client;

            target[event.once ? "once" : "on"](event.name, execute);
            client.events.set(event.name, execute);

            events.push({ Event: event.name, Status: chalk.green(`Loaded`) });
        } catch (error) {
            events.push({
                Event: file.split("/").pop().slice(0, -3),
                Status: chalk.red(`Error`),
            });
        }
    });

    console.table(events, ["Event", "Status"]);
    console.info("\n%s\x1b[0m", chalk.green("Loaded Events"));
    console.timeEnd("Events Loaded");
}
