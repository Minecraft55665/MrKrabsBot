import { GatewayIntentBits, Partials } from "discord.js";
import { ExtendedClient as Client } from "./Base/ExtendedClient.js";
import { config } from "dotenv";

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

config({
    path: client.config.envPath,
});

client.start(process.env.TOKEN);
