import {
    CommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Colors,
} from "discord.js";
import { ExtendedClient } from "../../Base/index.js";

export default {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Returns the latency.`),
    /**
     * @param {CommandInteraction} interaction
     * @param {ExtendedClient} client
     */
    async execute(interaction, client) {
        const now = Date.now();

        const pingEmbed = new EmbedBuilder()
            .setTitle(`Pong!`)
            .addFields([
                { name: `Message Ping`, value: `_Pinging..._` },
                { name: `WebSocket`, value: `${client.ws.ping}ms` },
            ])
            .setColor();

        interaction
            .reply({
                embeds: [pingEmbed],
            })
            .then((value) => {
                const end = Date.now();
                const messagePing = end - now;

                pingEmbed.setFields([
                    {
                        name: `Message Ping`,
                        value: `${messagePing}ms`,
                    },
                    { name: `WebSocket`, value: `${client.ws.ping}ms` },
                ]);

                setTimeout(() => {
                    interaction.editReply({
                        embeds: [pingEmbed],
                    });
                }, 1000);
            });
    },
};
