const { Message, Client } = require("discord.js");
const {Event} = require("../typings/Event");
const { ayarlar, commands } = require("./../../index");
module.exports = new Event({
    event: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    run: async(client, message) => {
        if(message.author.bot || message.channel.type == "DM") return;
      
        let prefix = ayarlar.prefix;
        if(message.content.startsWith(prefix)) {
    
            let args = message.content.split(" ").slice(1);
            let cmdName = message.content.split(" ")[0].slice(prefix.length);
            let cmd = commands.get(cmdName);

            if(cmd) {
                cmd.run({
                    client, 
                    message, 
                    args
                });
            }
    
        }
    }
})