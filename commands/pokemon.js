module.exports = {
  name: "p.pokemon",
  description: "pokemon bot",
  cooldown: 6000000,
  usage: "pokemon!",
  execute(msg, args) {
    const Discord = require("discord.js");
    const pokemon_caught = new Discord.MessageEmbed();
    var Pokedex = require("pokedex-promise-v2");
    var P = new Pokedex();
    var random_poke = Math.floor(Math.random() * 248);

    P.getPokemonByName(`${random_poke}`)
      .then(function(response) {
        var name = response.name;
        var img = response.sprites.front_default;

        const fs = require("fs"); //importing file save
        var xpPath = "./data-pokemon.json";
        var xpRead = fs.readFileSync(xpPath);
        var xpFile = JSON.parse(xpRead); //ready for use
        var userId = msg.author.id; //user id here
        var userData = xpFile[userId];

        function sum1(obj) {
          var total = 0;
          for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
              total += parseFloat(obj[el]);
            }
          }
        }
        var sum = 0;
        for(let key in userData.balls) {
          sum += userData.balls[key];
        }
        console.log(sum);
        if (sum <= 0) {
          msg.reply("You dont have enough balls! Use !balls to get some~");
          return;
        }

        Object.size = function(obj) {
          var size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };

        var size_balls = Object.size(userData.balls);
        var starting_ball = 0;
        var ball_name = Object.keys(userData.balls)[0];
        while (userData.balls[ball_name] <= 0 && starting_ball < size_balls) {
          ball_name = Object.keys(userData.balls)[starting_ball++];
        }

        userData.balls[ball_name]--;
        if (!userData.pokemons_caught) {
          //this checks if data for the user has already been created
          userData = {
            pokemons_caught: [name],
            img_pokemon: [img],
            total_number: 1
          };
          fs.writeFileSync(xpPath, JSON.stringify(xpFile, null, 2));
          console.log("whyyy");
        } else {
          console.log(userData.total_number);
          userData.total_number++;
          userData.pokemons_caught.push(name);
          userData.img_pokemon.push(img);
          fs.writeFileSync(xpPath, JSON.stringify(xpFile, null, 2));
          console.log("success");
        }
        pokemon_caught
          .setImage(img)
          .setTitle("Pokemon caught")
          .setFooter(`congrats you have caught ${name} using ${ball_name}`);
        msg.reply(pokemon_caught);
      })
      .catch(function(error) {
        console.log("There was an ERROR: ", error);
      });
  }
};
