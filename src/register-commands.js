require('dotenv').config({ path: '../.env' });
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'help',
        description: 'replies with a list of commands the bot can make',
    },
    {
        name: 'list',
        description: 'replies with a list of members of the server depending on their status',
        options: [
            {
                name: 'state',
                description: 'lists online members',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'online',
                        value: 'online'
                    },
                    {
                        name: 'offline',
                        value: 'offline'
                    },
                    {
                        name: 'dnd',
                        value: 'dnd'
                    },
                    {
                        name: 'idle',
                        value: 'idle'
                    }
                ]
            }
        ]
    },
    {
        name: 'chart',
        description: 'replies with a list of members of the server depending on their status',
        options: [
            {
                name: 'type',
                description: 'lists online members',
                type: ApplicationCommandOptionType.String,
                require: true,
                choices: [
                    {
                        name: 'bar',
                        value: 'bar'
                    },
                    {
                        name: 'pie',
                        value: 'pie'
                    }
                ]
            }
        ]
    },
];


const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('Resistring slash commands ...')
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands
        })
        console.log('Slash commands were registered successfully! ');
    } catch (error) {
        console.log("ERROR at register-commands! \n", error)
    }
})();