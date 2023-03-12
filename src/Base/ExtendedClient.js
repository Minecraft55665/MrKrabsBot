import chalk from "chalk";
import DiscordJS, { Client, Collection } from "discord.js";
import { readFileSync } from "node:fs";
import { loadEvents } from "../Handlers/index.js";

const { ClientOptions } = DiscordJS;

const fileURL = new URL("../../Configuration/config.json", import.meta.url);
const packageJSON = JSON.parse(readFileSync(fileURL));

export class ExtendedClient extends Client {
    /**
     * @param {ClientOptions} options
     */
    constructor(options) {
        super(options);
    }

    commands = new Collection();
    events = new Collection();
    config = packageJSON;

    /**
     * Runs the client.
     * @param {string | undefined} token The required token.
     * @return {Promise<void>}
     */
    async start(token) {
        await this.login(token)
            .then((_value) => {
                loadEvents(this);

                console.log(chalk.green(`Logged in as client.`));
            })
            .catch((reason) => {
                throw reason;
            });
    }
}
