const { MessageEmbed } = require("discord.js");
const { default: fetch } = require("node-fetch");
const { ayarlar } = require("../../../index");
const { Command } = require("../../typings/Command");

module.exports = new Command({
    name: "ip",
    aliases: ["site", "destek"],
    run: async({ client, message, args }) => {
        
        const embed = new MessageEmbed({
            title: ayarlar.minecraft.serverName + " Sunucu durumu",
            author: {
                name: "Sunucu sürümü: " + ayarlar.minecraft.serverVersion
            },
            color: "BLURPLE",
            description: `
Sunucu IP adresimiz: \`${ayarlar.minecraft.serverIP}\`
Website: ${ayarlar.minecraft.serverWebSite}
Destek adresi: ${ayarlar.minecraft.serverWebSite}/destek
            `,
            thumbnail: {
                url: `https://mcapi.tc/?${ayarlar.minecraft.serverIP}/favicon`
            },
            image: {
                url: `http://status.mclive.eu/${ayarlar.minecraft.serverName}/${ayarlar.minecraft.serverIP}/25565/banner.png`
            }
        });
        message.reply({ embeds: [embed] });
    }
})