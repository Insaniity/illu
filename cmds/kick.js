module.exports.run = (client, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have kick_members.");
  if (!message.mentions.users.first()) return message.channel.send("**Mention a user or multiple users to kick them.**")
    let ment = message.mentions.users;
    let text = []
    ment.forEach(m => {
        if (!message.guild.member(m).kickable) {
            message.channel.send("**Something went wrong when kicking:* "+m.username);
        } else {
            message.guild.member(m).kick().then(() => {
                text.push(m.username)
            }).catch(err => message.channel.send("**Something went wrong when kicking:** "+m.username))
        }
    });
    setTimeout(function() {
        if (text.length === 0) return;
        message.channel.send(text.join(", ")+" **has been kicked.**", {split:true});
    }, 1000);
}

module.exports.help = {
	name: "kick"
}
