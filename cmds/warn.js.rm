const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');

module.exports.run = (client, message, args) => {

  const user = message.mentions.users.first();
  const modlog = client.channels.find('name', 'mod-logs');
  const caseNum = caseNumber(client, modlog);
  if (!modlog) return message.reply('I cannot find a mod-log channel');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use !reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});

}

module.exports.help = {
	name: "warn"
}
