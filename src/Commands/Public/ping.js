import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Returns the latency.`),
    async execute(interaction, client) {
        interaction.reply({
            content: `test`,
        });
    },
};
