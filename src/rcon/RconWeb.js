const { Collection } = require("discord.js");
const express = require("express");
const app = express();
const { ayarlar, rcon } = require("./../../index");
const sendedCommands = [];
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/rcon", async(req, res) => {
    res.send(`
<html>
    <head>
        <title>${ayarlar.minecraft.serverName} RCON Konsol</title>
    </head>

    <center>
        <div style="
            box-shadow: 5px 5px 10px black;
            height: 80%;
            width: 80%;
        ">
            <div style="margin-top: 30px;">
            <form method="POST">
                <input style="
                    margin-top: 10px;
                    width: 30%;
                    height: 30px;
                    border: 1px solid white;
                    border-radius: 6px;
                    color: gray;
                " type="text" name="command" placeholder="Gönderilcek komutu buraya giriniz.">
                <button action="/rcon" style="
                    margin-top: 10px;
                    border-radius: 4px; 
                    border: 0px; 
                    background-color: green; 
                    color: white; 
                    height: 30px; 
                    width: 100px;
                    font-size: 15px;
                " type="submit">Gönder</button>

            </form>
            </div>

            <div style="margin: 10px; padding: 10px; border: 1px solid black; width: 60%;">
                ${sendedCommands.map((command) => {
                    let response = String(command)
                        .replaceAll("§4", "<renk style='color: #AA0000;'>")
                        .replaceAll("§c", "<renk style='color: #FF5555;'>")
                        .replaceAll("§8", "<renk style='color: #555555;'>")
                        .replaceAll("§6", "<renk style='color: #FFAA00;'>")
                        .replaceAll("§e", "<renk style='color: #FFFF55;'>")
                        .replaceAll("§2", "<renk style='color: #00AA00;'>")
                        .replaceAll("§a", "<renk style='color: #55FF55;'>")
                        .replaceAll("§b", "<renk style='color: #55FFFF;'>")
                        .replaceAll("§3", "<renk style='color: #00AAAA;'>")
                        .replaceAll("§1", "<renk style='color: #0000AA;'>")
                        .replaceAll("§9", "<renk style='color: #5555FF;'>")
                        .replaceAll("§d", "<renk style='color: #FF55FF;'>")
                        .replaceAll("§5", "<renk style='color: #AA00AA;'>")
                        .replaceAll("§f", "<renk style='color: black;'>")
                        .replaceAll("§7", "<renk style='color: #AAAAAA;'>")
                        .replaceAll("§0", "<renk style='color: black;'>")
                        .replaceAll("§l", "")
                        .replaceAll("§o", "")
                        .replaceAll("§m", "")
                        .replaceAll("§n", "")
                    return response + "<renk style='color: black'>";
                })}
            </div>
        <div>
    </center>
</html>
    `)
})

app.post("/rcon", async(req,res) => {
    let response = await rcon.send(req.body['command']);

    sendedCommands.push("[ Rcon: " + req.body['command'] + " ] <br> [ Server: " + response[0] + " ] <br><br>");

    res.redirect('/rcon');
})

app.listen(ayarlar.rcon.webPort, () => {
    console.log(ayarlar.rcon.webPort + " Portu dinleniyor.")
});

module.exports = {
    app
}