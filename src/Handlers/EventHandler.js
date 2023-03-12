import { loadFiles } from "../Functions/index.js";
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

    const files = await loadFiles("Events");

    for (const file of files) {
        try {
            const event = await import(file);
            const event_ = event.default;
            const execute = (...args) => event_.execute(...args, client);
            const target = event_.rest ? client.rest : client;

            target[event_.once ? "once" : "on"](event_.name, execute);
            client.events.set(event_.name, execute);

            events.push({ Event: event_.name, Status: `Loaded` });
        } catch (error) {
            events.push({
                Event: file.split("/").pop().slice(0, -3),
                Status: `Error`,
            });
            throw error;
        }
    }

    console.table(events, ["Event", "Status"]);
    console.info("%s\x1b[0m", chalk.green("Loaded Events"));
    console.timeEnd("Events Loaded");
}
