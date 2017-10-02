const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment')

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

module.exports.fire = (text, guild) => {
    if (!guild.channels) return
    let channel = guild.channels.find(c => c.topic === 'xaq-modlog')
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

client.on('message', message => {

    if (message.content === 'ping') {
    	message.channel.send('pong');
  	}
});


client.login(process.env.client_TOKEN);
