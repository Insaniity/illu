module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages.");
    if (!message.mentions.users.first()) return message.channel.send("Mention a user or multiple users to softban them. Kicks them and deletes all messages they have sent.")
    let ment = message.mentions.users;
    let text = []
    ment.forEach(m => {
        console.log(m)
        if (!message.guild.member(m).bannable) {
            message.channel.send("Something went wrong when softbanning: "+m.username);
        } else {
            let id = m.id;
            message.guild.ban(message.guild.member(m), 7).then(() => {
                message.guild.unban(id).then(() => {
                    text.push(m.username);
                })
            }).catch(err => message.channel.send("Something went wrong when softbanning: "+m.username))
        }
    });
    setTimeout(function() {
        if (text.length === 0) return;
        message.channel.send("`"+text.join(", ")+"` has been softbanned.", {split:true});
    }, 1000);
}

module.exports.help = {
	name: "softban"
}
