module.exports.run = (client, message, args) => {

  let guild = message.guild;
  const MemberRole = guild.roles.find(r => r.name === "Hide Announcements");
  message.author.addRole(MemberRole);

}

module.exports.help = {
	name: "announcements"
}
