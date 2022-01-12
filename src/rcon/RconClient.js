const { Rcon } = require("rcon-client");

const rcon = new Rcon({ host: "localhost", port: 25575, password: "123123" })


class RconClient {
    constructor({ host, port, password }) {
        const rcon = new Rcon({ host: "localhost", port: 25575, password: "123123" })
        rcon.on("connect", () => console.log("RCON Bağlantısı kuruldu"));
        rcon.on("authenticated", () => console.log("Giriş yapıldı"));
        rcon.on("end", () => console.log("end"));

        this.rcon = rcon;
    }
    
    async send(string) {
        await rcon.connect();
        let response = await Promise.all([
            rcon.send(string)
        ]);
        rcon.end();
        return response;
    }
}

module.exports = {RconClient}