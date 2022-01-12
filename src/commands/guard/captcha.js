const { MessageEmbed, MessageAttachment, Message, MessageActionRow, MessageButton, Interaction, ButtonInteraction } = require("discord.js");
const { ayarlar } = require("../../../index");
const { Command } = require("../../typings/Command");
const Captcha = require("@eyp57tr/captchajs");

module.exports = new Command({
    name: "captcha",
    aliases: ["doğrulama", "doğrula"],
    run: async({ client, message, args }) => {
      
        if(message.channelId !== ayarlar.channelIds.captcha) return;

        const captcha = [
                new Captcha({
                    backgoround_color: "BLACK",
                    textColor: "WHITE",
                    length: 5
                }),
                new Captcha({
                    backgoround_color: "BLACK",
                    textColor: "WHITE",
                    length: 5
                })
        ]
        let captchadata = Math.floor(Math.random() * captcha.length);
        const CaptchaAttachment = new MessageAttachment(captcha[captchadata].getBuffer(), "Captcha.png");
        let nextCaptchaData = captchadata == 1 ? 0 : 1;
        const Buttons = new MessageActionRow().addComponents(
            new MessageButton({
                customId: captcha[captchadata].getValue(),
                label: captcha[captchadata].getValue(),
                style: "PRIMARY"
            }),
            new MessageButton({
                customId: captcha[nextCaptchaData].getValue(),
                label: captcha[nextCaptchaData].getValue(),
                style: "PRIMARY"
            })
        )

        message.reply({
            files: [CaptchaAttachment],
            components: [Buttons]
        }).then(async(msg) => {
        
            let att;
            await msg.attachments.map((attachment) => {
                att = attachment;
            });
            msg.edit({
                embeds: [
                    new MessageEmbed({
                        title: ayarlar.minecraft.serverName + " Captcha doğrulama",
                        author: {
                            name: `${message.author.tag}`
                        },
                        color: "BLURPLE",
                        description: "Aşağıdaki captchayı tamamlayınız... (Süre: 15 Saniye)",
                        image: {
                            url: att.url
                        },
                    })
                ],
                files: []
            });
            /**
             * 
             * @param {ButtonInteraction} i 
             * @returns 
             */
            let filter = (i) => (i.member.id == message.member.id && !i.user.bot && (i.customId == captcha[captchadata].getValue() || i.customId == captcha[nextCaptchaData].getValue()));
            let component = msg.createMessageComponentCollector({
                filter,
                componentType: "BUTTON",
                max: 1,
                time: 15000
            });

            component.on('collect', (interaction) => {
                if(interaction.customId == captcha[captchadata].getValue()) {
                    message.member.roles.add(ayarlar.roles.captchaVerified);
                    interaction.reply({
                        content: "Başarıyla doğrulandınız. Verilen rol: <@&"+ayarlar.roles.captchaVerified+">",
                        ephemeral: true
                    });
                } else {
                    interaction.reply({
                        content: "Lütfen `!doğrula` yazarak tekrar deneyiniz.",
                        ephemeral: true
                    });
                }
            });
        });
    }
})