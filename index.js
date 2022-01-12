// Version 0.0.1 dir geliştirilecektir.

const { Client, Collection } = require("discord.js");
const fs = require("fs");
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGES",
        "GUILD_INTEGRATIONS",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_TYPING",
        "GUILD_INVITES",
        "GUILD_PRESENCES",
        "DIRECT_MESSAGES",
        "GUILD_VOICE_STATES",
        "GUILD_EMOJIS_AND_STICKERS"
    ],
    shards: "auto"
})
const commands = new Collection();
const ayarlar = require("./ayarlar.json");
const {default: fetch} = require("node-fetch");
const captchaDatas = new Map();

module.exports = {
    client,
    ayarlar,
    commands,
    captchaDatas
}

// Command & Event handler
const commandFiles = fs.readdirSync("./src/commands");
commandFiles.map(async(cmdFile) => {
    fs.readdir("./src/commands/" + cmdFile, function(err, files) {
        files.map((file) => {
            let cmdProps = require("./src/commands/" + cmdFile + "/" + file);
            console.log(cmdProps.name + " komutu başarıyla yüklendi")
            commands.set(cmdProps.name, cmdProps);
            if(cmdProps.aliases.length >= 1) {
                cmdProps.aliases.map((alias) => {
                    commands.set(alias, cmdProps);
                })
            }
        })
    })
})

fs.readdir("./src/events", function(err, files) {
    console.log("-_-_-_- Eventler yükleniyor -_-_-_-")
    files.map((eventFile) => {
        let eventProps = require("./src/events/" + eventFile)

        client.on(eventProps.event, eventProps.run.bind(null, client));
        
        console.log(eventProps.event + " eventi yüklendi");
    })

});

client.login(ayarlar.token);

/** 
 * Version Checker from Github :)
 * @author eyp57
 */

let packageJson = require("./package.json");

setTimeout(() => {
    checkUpdate();
}, 1250);

const checkUpdate = async() => {
    let githubPackageJson = await fetch("https://raw.githubusercontent.com/eyp57/Minecraft-Sunucu-Botu/master/package.json").then(res => res.json());

    console.log("-_-_-_- Update Checker -_-_-_-")

    if(githubPackageJson['version'] !== packageJson['version']) {
        console.log("The version you use is up to date please update the Bot to the newest version");
        console.log("Your version: " + packageJson['version']);
        console.log("New version: " + githubPackageJson['version']);
    } else {
        console.log("Your using the latest version.");
    }
}