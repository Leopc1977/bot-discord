const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require ('fs');
var database = JSON.parse(fs.readFileSync('database.json', 'utf8'));

const prefix = "$"

var msgTemp = new Array();

let badWordList = [];
badWordList.push('fuck');

let idLogJson = null;

for (var i = 0; i < 10; i++)
{
 msgTemp[i] = new Array();
}

client.on("ready", () => {
    client.user.setPresence({
        status: 'online'
    })

    update();
})

client.on("message", message => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.author.bot) return;

  if (command === 'ping')
  {
  message.channel.sendMessage('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }
  if (command === 'date') {
    let [idMsg, day, hour,minute, idChannel] = args;

    let msg = message.channel.fetchMessage(idMsg.toString());

    message.channel.fetchMessages({around: idMsg, limit: 1})
    .then(msg => {
        const fetchedMsg = msg.first();
        insertMsgTemp[0] = fetchedMsg.content;
    });

    let insertMsgTemp =  new Array(3);
    insertMsgTemp[0] = args[0];
    insertMsgTemp[1] = calc(day,hour,minute)
    insertMsgTemp[2] = idChannel
    msgTemp.push(insertMsgTemp);

    message.channel.send("Message : "+insertMsgTemp[0]+" to send the day : "+day+" and the hour : " +hour+" and minute : "+minute+" in the channel : " + idChannel);
  }
  
   if (command === 'addword') {
     let [badword] = args;
     //badWordList.push(badword);
      database.badword.push(badword);

     message.channel.send("Le mot "+badword+" a été ajouté avec succès")
   }

  if (command === 'removeword') {
    badWordList.forEach((item, index) => {
      if ( message.toString().toUpperCase() == message.content.toString().toUpperCase() ){
        badWordList.splice(index,1);
      }
    })
  }
  if (command === 'badwordlist') {
    message.channel.send("La liste des mots interdits : ")
    for (var i = 0; i < badWordList.length; i++) {
      message.channel.send(badWordListt[i]+", ");
    }
    for (var i=0;i<database.badword.length;i++)
    {
      message.channel.send(database.badword[i]);
    }    
  }

  //2 looking for words
  let foundInText = false;
  let badWord = ""
  for (var i in database.badword) { // loops through the blacklisted list
    if (message.content.toLowerCase().includes(database.badword[i].toLowerCase())) {
      foundInText = true;
      badWord = database.badword[i];
     }
  }
  // checks casesensitive words

  //3 deletes and send message
  if (foundInText) {
    message.delete();
    message.channel.send("Le mot "+badWord+" interdit !")
  }

  if (command === 'json')
  {
    idLogJson = args;
    message.channel.send(args);
  }

  if (command === 'util'){
    message.channel.send("Les fonctions du bot sont :");
    message.channel.send("$date idDuMessage Jour Heure Minute idDuSalon : pour programmer l'envoi d'un message");
    message.channel.send("$addword mot : pour ajouter un mot dans la liste des mots interdits");
    message.channel.send("$removeword mot : pour retirer un mot de la liste des mots interdits");
    message.channel.send("$badwordlist (sans paramètres): envoi la liste des mots interdits")
    message.channel.send("$ping : ")
  }

  if (idLogJson != null )
  {
    client.channels.get(idLogJson.toString()).send("```"+fs.readFileSync('database.json', 'utf8')+"```")
  }

  fs.writeFile("database.json", JSON.stringify(database), (x) => {
    if (x) console.error(x)
  });

});

setInterval(update , 0)

function update(){
  verif()
}

function verif(){
  msgTemp.forEach((item, index) => {
    let x = new Date();
    x.setHours(x.getHours()+2)

    let timerDate = new Date();
    timerDate.setHours(timerDate.getHours()+2)

    if (timerDate > item[1] || timerDate == item[1])
    {
      item[2] = item[2].toString();
      client.channels.get(item[2]).send(item[0]);
      delete item[0];
      delete item[1];
      delete item[2];
    }
  })
}

function calc(pDay, pHour, pMinute){
  let timerDate = new Date();
  timerDate.setDate(pDay);
  timerDate.setHours(pHour);
  timerDate.setMinutes(pMinute)
  timerDate.setSeconds(0);
  return timerDate
}

client.login("NTY3OTg4MTc5OTc0NjE5MTQ2.XvNt2w.2DPAJ8UefuTIG7hk-tOtEvj2W3s");