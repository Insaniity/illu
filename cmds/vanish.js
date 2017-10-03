const ms = require('ms');

module.exports.run = (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have manage messages.");

  if (!bot.lockit) bot.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('You must set a duration in either hours, minutes or seconds');

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.send('Whoosh! The channel is gone!');
      clearTimeout(bot.lockit[message.channel.id]);
      delete bot.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false,
      READ_MESSAGES: false
    }).then(() => {
      message.channel.send(`Channel hidden for ${ms(ms(time), { long:true })}`).then(() => {

        bot.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null,
            READ_MESSAGES: null
          }).then(message.channel.send('Channel is back.')).catch(console.error);
          delete bot.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }

}

module.exports.help = {
  name: "hide"
}