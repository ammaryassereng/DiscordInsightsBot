const { Client, IntentsBitField, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const drawPieChart = require('./src/chartManager');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences
    ]
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
})

client.on('messageCreate', async (message) => {
    if (message.content === "ping") {
        message.reply('node.js server is up and running');
    }

    if (message.content === "chart") {
        try {
            // Fetch all members of the guild
            const members = await message.guild.members.fetch();

            const filePath = await drawPieChart(members);
            const attachment = new AttachmentBuilder(filePath);
            message.reply({ content: 'Here is your file:', files: [attachment] });

        } catch (error) {
            console.error("Error fetching members:", error);
            message.reply("There was an error fetching the member statuses.");
        }
    }
})

client.login(process.env.BOT_TOKEN);
