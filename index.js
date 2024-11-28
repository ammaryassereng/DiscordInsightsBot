const { Client, IntentsBitField, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const { drawPieChart, createBarChart } = require('./src/chartManager');

// listing the needed intents for the project
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences
    ]
})

// return a message impying that the node.js is connected to the bot
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
})

// return a message impying that the node.js app in up and running
client.on('messageCreate', async (message) => {
    if (message.content === "ping") {
        try {
            message.reply('node.js server is up and running');
        } catch (error) {
            console.log("ERROR at message contents! \n", error)
        }
    }
})

// list of interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // help command
    if (interaction.commandName === 'help') {
        try {
            interaction.reply({
                content: 'Typing the list of commands I can make \n' +
                    '---------------------------------------------------------------\n' +
                    '/help : lists the bot\'s available commands \n' +
                    '---------------------------------------------------------------\n' +
                    '/list : lists the server members depending on their status \n' +
                    '   --> options : - \n' +
                    '   state (optional) : accepts 4 values online, offline, dnd and idle \n' +
                    '       online : lists offline members \n' +
                    '       offline : lists offline members \n' +
                    '       dnd : lists don\'t disturb members \n' +
                    '       idle : lists idle members \n' +
                    '   any other option or no options at all will list all members \n' +
                    '---------------------------------------------------------------\n' +
                    '/chart : draw a graph showing the numbers of members by their stasus \n' +
                    '   --> options : - \n' +
                    '   type (required) : indicates the type of the graph, either bar or pie \n' +
                    '       bar : the graph is drawn in a bar graph \n' +
                    '       pie : the graph is drawn in a pie graph'
            });
        } catch (error) {
            console.log("ERROR at command interactions! \n", error)
        }

    }

    // list command
    if (interaction.commandName === 'list') {
        try {
            let selectedOpt = interaction.options.get('state')?.value;

            const members = await interaction.guild.members.fetch();
            let msg = '';
            members.map((member) => {
                if (selectedOpt == null ||
                    selectedOpt == undefined ||
                    (selectedOpt != 'online' &&
                        selectedOpt != 'offline' &&
                        selectedOpt != 'dnd' &&
                        selectedOpt != 'idle')) {
                    msg += `${member.user.username} : ${member.presence ? member.presence.status : 'offline'} \n`;
                }
                else if ((member.presence && member.presence.status === selectedOpt) ||
                    !member.presence && selectedOpt === 'offline') {
                    msg += `${member.user.username} : ${selectedOpt} \n`;
                }
            })

            interaction.reply(msg);
        } catch (error) {
            console.log("ERROR at command interactions! \n", error)
        }


    }


    // chart command
    if (interaction.commandName === 'chart') {
        try {
            if (interaction.options.get('type') === null || interaction.options.get('type') === undefined) {
                interaction.reply("ERROR! chart type is required! ");
            }
            else {
                const members = await interaction.guild.members.fetch();
                console.log(interaction.options.get('type').value);
                let filePath = "";
                if (interaction.options.get('type').value == 'bar')
                    filePath = await createBarChart(members);
                else
                    filePath = await drawPieChart(members);
                const attachment = new AttachmentBuilder(filePath);
                interaction.reply({ content: 'Here is your file:', files: [attachment] });
            }
        } catch (error) {
            console.log("ERROR at command interactions! \n", error)
        }

    }
});

client.login(process.env.BOT_TOKEN);
