module.exports.run = (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return;
  if (!message.mentions.users.first()) return message.channel.send("**Mention a user to message them.**")
    let ment = message.mentions.users;
    let text = []

    var cmdTxt = message.content.split(" ; ")[0].substring(1).toLowerCase();
    var suffix = message.content.substring(cmdTxt.length + 2);

    ment.forEach(m => {
        message.guild.member(m).send(suffix);
    });
    setTimeout(function() {
        if (text.length === 0) return;
        message.channel.send(text.join(", ")+" **has been kicked.**", {split:true});
    }, 1000);
}

module.exports.help = {
	name: "message"
}
