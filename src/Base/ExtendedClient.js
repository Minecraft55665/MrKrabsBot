import chalk from "chalk";
import DiscordJS, { Client, Collection } from "discord.js";
// eslint-disable-next-line
import config from "../../Configuration/config.json" assert { type: "json" };
import { loadEvents } from "../Handlers/index.js";

const { ClientOptions } = DiscordJS;

export class ExtendedClient extends Client {
    /**
     * @param {ClientOptions} options
     */
    constructor(options) {
        super(options);
    }

    commands = new Collection();
    events = new Collection();
    config = config;

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
