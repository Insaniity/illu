const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
   	  client.user.setStatus("dnd"); //dnd , online , ldle
      client.user.setGame("im special c;");
      console.log("Running as user "+client.user.username+"#"+client.user.discriminator+".");
//			client.user.setAvatar('./icon.png')
// 			.then(user => console.log(`New avatar set!`))
//			.catch(console.error);
});



client.on('message', message => {

let talkedRecently = new Set();
if (talkedRecently.has(message.author.id)) {
  return;
}
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 2500);


    if (message.content === 'ping') {
    	message.channel.send('pong');
  	}
});


client.login(process.env.BOT_TOKEN);