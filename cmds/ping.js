const ms = require('ms');
const moment = require('moment');
require("moment-duration-format");

module.exports.run = (client, message, args) => {
	const duration = moment.duration(client.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");

    message.channel.send(`Pong...? ${Math.round(client.ping)}ms. Uptime  ${duration}.`)

}

module.exports.help = {
	name: "ping"
}
