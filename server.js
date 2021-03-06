// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/dreams", function(request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function(request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

const fs = require("fs");
const {Client, Intents} = require("discord.js");
const  Discord = require("discord.js")
const bot = new Client({intents:  [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
bot.commands = new Discord.Collection();
bot.uniq_commands = new Discord.Collection();
bot.cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands");
const uniq_commandsFiles = fs.readdirSync("./uniq_commands");
const { cooldowns } = bot;
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

for (const file of uniq_commandsFiles) {
  const uniq_command = require(`./uniq_commands/${file}`);
  bot.uniq_commands.set(uniq_command.name, uniq_command);
}

bot.on("message", msg => {
  if (!msg.content.startsWith(process.env.MADE_WITH) && !msg.author.bot) {
    var upcase = msg.content.toLowerCase();

    if (upcase.includes("i want a new ic")) {
      bot.uniq_commands.get("random_nric").execute(msg);
    } else if (upcase.includes("!collect")) {
      bot.uniq_commands.get("!collect").execute(msg);
    } else if (upcase.includes("legit") && upcase.includes("is")) {
      bot.uniq_commands.get("legit").execute(msg);
    } else if (upcase == "info") {
      msg.channel.send(
        "Running on Glitch ^^ created by Wenyue\n\nNode version: v8.9.3\n\nnpm: v5.5.1"
      );
    } else if (upcase.startsWith("test_pic")) {
      bot.uniq_commands.get("test_pic").execute(msg);
    } else if (upcase.startsWith("add_pic")) {
      bot.uniq_commands.get("add_pic").execute(msg);
    } else if (upcase.startsWith("tag")) {
      bot.uniq_commands.get("tag").execute(msg);
    } else if (upcase == "i want help") {
      bot.uniq_commands.get("Help").execute(msg);
    } else if (upcase == "how many pics do i have?") {
      bot.uniq_commands.get("num_of_pics").execute(msg);
    } else if (upcase.startsWith("bus")) {
      bot.uniq_commands.get("bus").execute(msg);
    } else if (upcase == "stop") {
      bot.uniq_commands.get("stop").execute(msg);
    } else if (upcase == "weather") {
      bot.uniq_commands.get("weather").execute(msg);
    } else if (upcase == "bitcoin price") {
      bot.uniq_commands.get("bitcoin").execute(msg);
    }
  }

  if (msg.author.bot) return;

  const args = msg.content.slice(process.env.MADE_WITH.length).split(/ +/);
  const command = args.shift().toLowerCase();
})

// Music bot

bot.on("ready", () => {
  
  var channel = bot.channels.cache.get('478431286936076291');
  
  console.log("Welcome My Master...");

  bot.user.setActivity("Improving Myself Everyday");
});

bot.login(`${process.env.SECRET}`);
