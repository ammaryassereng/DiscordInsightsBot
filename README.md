# DiscordInsightsBot

# overview

This project is a Discord bot built using Node.js and the discord.js library. It provides several interactive commands that users can utilize to interact with the bot and view various server statistics.

# project workflow

1- Ping Command

    Trigger: User sends a message containing the word "ping".
    Action: The bot receives the message and triggers a response from the server.
    Response: The bot replies with "Node.js server is up and running", confirming that the server is active and functioning.

2 - Help Command

    Trigger: User sends the /help command.
    Action: The bot processes the command and retrieves a list of available commands.
    Response: The bot replies with a list of executable commands such as /ping, /list, and /chart, helping users understand what   they can do with the bot.

3 - List Command

    Trigger: User sends the /list command with an optional status filter (e.g., "online", "offline", "don’t disturb", or "idle").
    Action: The bot filters the server's user list based on the specified status.
    Response: The bot sends a list of users who match the status filter, letting the user see which users are currently online, offline, or in other specified states.

4 - Chart Command

    Trigger: User sends the /chart command with an option to select the chart type (either "bar" or "pie").
    Action: The bot collects the number of users in each status category (online, offline, etc.) and generates a chart using Chart.js.
    Response: The bot generates and sends a chart (either a bar chart or pie chart) displaying the number of users in each status category. The chart is sent as an image in the chat.

# Setup instructions

to start using the project

1- install the required dependencies

    type: npm install

2- create a .env file in the root folder of your project
3- add 3 environment variables in your .env file
    a- BOT_TOKEN: the token of your bot
    b- GUILD_ID: server id
    c- CLIENT_ID: bot id

4- register the commands
    a- type: cd src
    b- type: node  register-commands.js

5- start the app
    a- type: cd ..
    b- type: npm start
 
