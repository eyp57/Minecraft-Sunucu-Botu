const { MessageEmbed } = require("discord.js");
const { default: fetch } = require("node-fetch");
const { ayarlar } = require("../../../index");
const { Command } = require("./../../typings/Command");

module.exports = new Command({
    name: "sunucubilgi",
    aliases: ["mcsunucubilgi"],
    run: async({ client, message, args }) => {
        

        let ip = ayarlar.minecraft.serverIP;
        let serverStatus = await fetch(`https://mcapi.tc/?${ip}/json`, {method: "GET"}).then(res => res.json());
        const embed = new MessageEmbed({
            title: ayarlar.minecraft.serverName + " Sunucu durumu",
            author: {
                name: "Sunucu sürümü: " + ayarlar.minecraft.serverVersion
            },
            color: "BLURPLE"
        })

        if(serverStatus['status'] !== "offline") {
            embed.setThumbnail(`https://mcapi.tc/?${ip}/favicon`)
            embed.setImage(`http://status.mclive.eu/${ayarlar.minecraft.serverName}/${ip}/25565/banner.png`)
            embed.setFields([
                {
                    name: "💻 IP adresi",
                    value: `${ip}`,
                    inline: true
                },
                {
                    name: "🚀 Gecikme:",
                    value: `${serverStatus['ping']}`,
                    inline: true
                },
                {
                    name: "♟️ Aktif",
                    value: `${serverStatus['players']}/${serverStatus['max_players']}`
                }
            ])
        } else {
            embed.setDescription("Sunucuya erişilemiyor veya deaktif...")
        }
        message.reply({ embeds: [embed] });
    }
})