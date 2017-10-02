const Discord = require('discord.js');
const client = new Discord.Client();

bot.on("ready", () => {
   	  bot.user.setStatus("dnd"); //dnd , online , ldle
      bot.user.setGame("im special c;");
      console.log("Running as user "+bot.user.username+"#"+bot.user.discriminator+".");
			bot.user.setAvatar('./icon.png')
  			.then(user => console.log(`New avatar set!`))
  			.catch(console.error);
});



client.on('message', message => {
    if (message.content === 'ping') {
    	message.channel.send('pong');
  	}
});


client.login(process.env.BOT_TOKEN);