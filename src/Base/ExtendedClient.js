import chalk from "chalk";
import DiscordJS, { Client, Collection } from "discord.js";
import config from "../../Configuration/config.json" assert { type: "json" };
import { loadCommands, loadEvents } from "../Handlers/index.js";
import mongoose from "mongoose";

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
                loadCommands(this);
                loadEvents(this);

                mongoose
                    .connect(process.env.MONGO_URI, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        keepAlive: true,
                    })
                    .then(() => {
                        console.log(chalk.green(`Connected to MongoDB!`));
                    })
                    .catch((error) => {
                        throw error;
                    });

                console.log(chalk.green(`Logged in as client.`));
            })
            .catch((reason) => {
                throw reason;
            });
    }
}
