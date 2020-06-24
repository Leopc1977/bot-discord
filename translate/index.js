const Discord = require('discord.js');
const client = new Discord.Client();

idSalonFR = "725293934858993744";
idSalonIT = "725293964776833084";

apiKey = process.env.key;
var options = {};
var googleTranslate = require("google-translate")(apiKey, options)

client.on('ready', () => {
  console.log(`Loaded in as ${client.user.tag}!`);
})

client.on('message', message => {
  if (message.author.bot) return;
  const args = message.content.trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == "idFR")
  {
    idSalonFR = args[0] 
    message.channel.send(`Le salon FR a été changé (${idSalonFR})`)
  }  

  if (message.content == "idIT")
  {
    idIT = args[0] 
    message.channel.send(`Le salon FIT a été changé (${idIT})`)
  }

  if (message.channel.id == idSalonFR)
  {
    googleTranslate.translate(message.content, 'it', function(err, translation) {
    client.channels.fetch(idSalonIT)
    .then(channel => 
    {
      channel.send(`||${message.content}||`);
      channel.send(translation.translatedText);  
    })
    .catch(console.error);
    });
  }else{
    googleTranslate.translate(message.content, 'fr', function(err, translation) {
      client.channels.fetch(idSalonFR)
      .then(channel => 
      {
        channel.send(`||${message.content}||`);
        channel.send(translation.translatedText);  
      })
      .catch(console.error);
    });
  }
});

client.login(process.env.token);