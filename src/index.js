import { GatewayIntentBits, Partials } from "discord.js";
import { ExtendedClient } from "./Base/index.js";
import { config } from "dotenv";

const client = new ExtendedClient({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

config({
    path: client.config.envPath,
});

client.start(process.env.TOKEN);
