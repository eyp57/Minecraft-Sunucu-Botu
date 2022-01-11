const {Event} = require("../typings/Event");

module.exports = new Event({
    event: "ready",
    run: async(client) => {
        console.log(client.user.username + " adına giriş yaptım.")
    }
})