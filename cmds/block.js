const fs = module.require("fs");
const kryblocked = require("./krystal/blocked.json");
const blocked = kryblocked.blockedIDs;

module.exports.run =  (client, message, args) => {

        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (!file.blockedIDs[args[0]]) {
                file.blockedIDs[args[0]] = {
                    blocked: "true"
                };
                fs.writeFileSync("./krystal/blocked.json", JSON.stringify(file));
                message.channel.send("Added `" + message.content.substr(12) + "` to the blacklist.");
            } else {
                message.channel.send("ID is already blacklisted.");
            }

        } else {
            return message.channel.send("Missing Permissions");
        }

}

module.exports.help = {
    name: "blacklist"
}
