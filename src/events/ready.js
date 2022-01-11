const { ayarlar } = require("./../../index");
const {Event} = require("../typings/Event");
const { default: fetch } = require("node-fetch");
const { Client } = require("discord.js");

module.exports = new Event({
    event: "ready",
    /**
     * 
     * @param {Client} client 
     */
    run: async(client) => {
        console.log(client.user.username + " adına giriş yaptım.")

        let statusText = ayarlar.durum;

        if(statusText.includes("{online}")) {
            let ip = ayarlar.minecraft.serverIP;
            setInterval(async() => {
                let webApi = await fetch(`https://mcapi.tc/?${ip}/json`).then(res => res.json());

                statusText = statusText.replace("{online}", webApi['players']);

                client.user.setActivity(statusText, {
                    type: "PLAYING"
                })
            }, 1250)
        } else {
            client.user.setActivity(statusText, {
                type: "PLAYING"
            })
        }
    }
})