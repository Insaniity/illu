const fs = module.require("fs");

module.exports.run =  (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages.");

	let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send("You did not specify a user mention or ID!");

	if(toMute.id === message.author.id) return message.channel.send("You cannot mute yourself.");
	if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute a member who is higher or has the same role as you.");

	let role = message.guild.roles.find(r => r.name === "Muted");
	if(!role) {
		try {
			role = message.guild.createRole({
				name: "Muted",
				color: "#000000",
				permissions: []
			});

			message.guild.channels.forEach((channel, id) => {
				 channel.overwritePermissions(role, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		} catch(e) {
			console.log(e.stack);
		}
	}

	if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");


 toMute.addRole(role);
		message.channel.send("I have muted this user!");
}

module.exports.help = {
	name: "mute"
}
