const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const ms = require('ms');
const moment = require('moment');
require("moment-duration-format");
const request = require('request');
const botSettings = require("./botsettings.json")

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

client.on("ready", () => {
   	  client.user.setStatus("dnd"); //dnd , online , ldle
      client.user.setGame("im special c;");
      console.log("Running as user "+client.user.username+"#"+client.user.discriminator+".");
//			client.user.setAvatar('./icon.png')
// 			.then(user => console.log(`New avatar set!`))
//			.catch(console.error);
//			client.user.setUsername("Ben's Chat")
// 			 .then(user => console.log(`My new username is ${user.username}`))
// 			 .catch(console.error);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const MemberRole = guild.roles.find(r => r.name === "[I] Member");
  member.addRole(MemberRole);
});

client.on("message", message => {
  if(message.author.client) return;
    if(message.channel.type === "dm") {
    return;
    }

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);
    var cmdTxt = message.content.split(" ")[0].substring(1).toLowerCase();
    var suffix = message.content.substring(cmdTxt.length + 2);

    if(!command.startsWith(prefix)) return;



    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
});

module.exports.fire = (text, guild) => {
    if (!guild.channels) return
    let channel = guild.channels.find(c => c.topic === 'logs')
    if (!channel) return
    let time = `**\`[${moment().format("M/D/YY - hh:mm")}]\`** `
    channel.send(time + text, {
        split: true
    })
}

client.on('messageDelete', msg => {
    if (msg.channel.type !== "text") return
    exports.fire(`**#${msg.channel.name} | ${msg.author.tag} deleted their message:** \`${msg.content}\``, msg.guild)
})

client.on('messageUpdate', (msg, newMsg) => {
    if (msg.content === newMsg.content) return
    exports.fire(`**#${msg.channel.name} | ${msg.author.tag} edited their message:**\n**before:** \`${msg.content}\`\n**+after:** \`${newMsg.content}\``, msg.guild)
})

client.on('guildMemberUpdate', (old, nw) => {
    let txt
    if (old.roles.size !== nw.roles.size) {
        if (old.roles.size > nw.roles.size) {
            //Taken
            let dif = old.roles.filter(r => !nw.roles.has(r.id)).first()
            txt = `**${nw.user.tag} | Role taken -> \`${dif.name}\`**`
        } else if (old.roles.size < nw.roles.size) {
            //Given
            let dif = nw.roles.filter(r => !old.roles.has(r.id)).first()
            txt = `**${nw.user.tag} | Role given -> \`${dif.name}\`**`
        }
    } else if (old.nickname !== nw.nickname) {
        txt = `**${nw.user.tag} | Changed their nickname to -> \`${nw.nickname}\`**`
    } else return
    exports.fire(txt, nw.guild)
})

client.on('roleCreate', (role) => {
    exports.fire("**New role created**", role.guild)
})

client.on('roleDelete', (role) => {
    exports.fire("**Role deleted -> `" + role.name + "`**", role.guild)
})

client.on('roleUpdate', (old, nw) => {
    let txt
    if (old.name !== nw.name) {
        txt = `**${old.name} | Role name updated to -> \`${nw.name}\`**`
    } else return
    exports.fire(txt, nw.guild)
})

client.on('guildBanAdd', (guild, user) => {
    exports.fire(`**User banned -> \`${user.tag}\`**`, guild)
})

client.on('guildBanRemove', (guild, user) => {
    exports.fire(`**User unbanned -> \`${user.tag}\`**`, guild)
})

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands!`);

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});


process.on('unhandledRejection', error => {
  console.error(`Uncaught Promise Error: \n${error.stack}`);
});

client.login(process.env.client_TOKEN);
