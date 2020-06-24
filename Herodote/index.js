 const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

var database = JSON.parse(fs.readFileSync('database.json', 'utf8'));

const prefix = "$";

client.on('ready', () => {
  console.log(`Load in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'random')
  {
    [param] = args
    //parametre lore/perso
    if (param == "lore")
    {
      let i = random(0,database.lore.length-1);
      message.channel.send(database.lore[i]);
    } else if (param == "perso"){
      let i = random(0,database.perso.length-1);
      message.channel.send(database.perso[i]);
    } else if (param == "meme"){
      let i = random(0,database.meme.length-1);
      message.channel.send(database.meme[i]);
    }
    else {
      message.channel.send("Paramètre invalide !")
    }
  }

  if (command === 'list')
  {
    //parametre lore/perso
    message.channel.send("Lore : ")
    for (var i=0;i<database.lore.length;i++)
    {
      message.channel.send(database.lore[i]);
    }    
    message.channel.send("Personnages : ")
    for (var i=0;i<database.perso.length;i++)
    {
      message.channel.send(database.perso[i]);
    }    
  }

  	if (command === 'sphinx') {

    randomI = random (0, database.quizzac.length-1);

    for (var k=0; k < database.quizzac[randomI].question.length;k++)
    {
      message.channel.send(database.quizzac[randomI].question[k]);    
    }

		message
			.react('1️⃣')
			.then(() => message.react('2️⃣').then(() => message.react('3️⃣')));
		const filter = (reaction, user) => {
			return (
				['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) &&
				user.id === message.author.id
			);
		};

		message
			.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === database.quizzac[randomI].answer[0]) {
					message.reply('Bonne réponse !');
				} else {
					message.reply('Mauvaise réponse !');
				} 
			})
			.catch(collected => {
				console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
			});
	}

});

function random(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.login("NzExMjkwODk5NjU2NzM2Nzc4.XvNu2A.9a_qHCJWxaASZoGVrJdEDSt8J2A");