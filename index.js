﻿const Discord = require("discord.js");
const colors = require("colors");
const fs = require("fs"); 
const express = require('expresss');
app.get('/', async (req, res) => {
    res.send('express')
})

app.get('/user/:userId', async (req, res) => {
    var user = client.fetchUser(req.params.userId).catch(res.send('<pre>500 internal server error</pre>'))
    res.send(`User grabbed was ${user}`).catch(console.error)
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
  try{
    require(`./handlers/${handler}`)(client);
  }catch (e){
    console.log(e)
  }
});
["erela_js_handler", "erela_js_node_log"].forEach(handler => {
  try{
    require(`./handlers/lavalink/${handler}`)(client);
  }catch (e){
    console.log(e)
  }
});
//login into the bot
client.login(require("./botconfig/config.json").token);

const Enmap = require("enmap")
client.settings = new Enmap({name: "settings", dataDir: "./database/settings"})

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at: " + promise)
  console.log("Reason: " + reason)
})
process.on("uncaughtException", (err, origin) => {
  console.log("Caught exception: " + err)
  console.log("Origin: " + origin)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err);
  console.log("Origin: " + origin)
});
process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});
process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(type, promise, reason);
});
