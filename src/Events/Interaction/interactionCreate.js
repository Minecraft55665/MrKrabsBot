import { CommandInteraction, Events } from "discord.js";
import { ExtendedClient } from "../../Base/index.js";

export default {
    name: Events.InteractionCreate,
    /**
     * @param {CommandInteraction} interaction
     * @param {ExtendedClient} client
     */
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        const { command: command_ } = command;

        if (
            command_.developer &&
            interaction.user.id !== process.env.OWNER_ID
        ) {
            return interaction.reply({
                content: `This interaction is only available for the developer of this bot.`,
                ephemeral: true,
            });
        }

        if (!command_) {
            return interaction.reply({
                content: `Interaction either outdated/expired or unavailable.`,
                ephemeral: true,
            });
        }

        command_.execute(interaction, client);
    },
};
