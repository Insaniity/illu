const ms = require('ms');
const moment = require('moment');
require("moment-duration-format");

module.exports.run = (bot, message, args) => {
	const duration = moment.duration(bot.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");

    message.channel.send(`Pong...? ${Math.round(bot.ping)}ms. Uptime  ${duration}.`)

}

module.exports.help = {
	name: "ping"
}