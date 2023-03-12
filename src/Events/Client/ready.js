import chalk from "chalk";
import { Events } from "discord.js";
import { ExtendedClient } from "../../Base/index.js";

export default {
    name: Events.ClientReady,
    once: true,
    /**
     * @param {ExtendedClient} client
     * @return {Promise<void>}
     */
    async execute(client) {
        console.log(chalk.green(`${client.user.tag} is up and ready!`));
    },
};
