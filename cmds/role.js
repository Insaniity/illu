module.exports.run = (client, message, args) => {

  const Krystal = guild.roles.find(r => r.name === "Hide Announcements");
  message.author.addRole(Krystal);

}

module.exports.help = {
	name: "announcements"
}
