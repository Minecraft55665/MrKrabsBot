import chalk from "chalk";
import { Client, Collection, ClientOptions } from "discord.js";

export class ExtendedClient extends Client {
    /**
     * @param {ClientOptions} options
     */
    constructor(options) {
        super(options);

        this.commands = new Collection();
        this.events = new Collection();
        this.config = import("../../Configuration/config.json");
    }

    /**
     * Runs the client.
     * @param {string | undefined} token The required token.
     * @return {Promise<void>}
     */
    async start(token) {
        await this.login(token)
            .then((_value) => {
                console.log(chalk.green(`Logged in as client.`));
            })
            .catch((reason) => {
                throw reason;
            });
    }
}
