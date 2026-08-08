let websoc = require("ws")
let serv = new websoc.WebSocket.Server({ port: 3000 });
let ultimamensagem = []

serv.on("connection", (socket) => {
    if (ultimamensagem[1]) {
    for (const mensagem of ultimamensagem) {
    socket.send(mensagem)
    }}
    socket.on("message", (mensagem) => {
        let mensagensemjson = JSON.parse(mensagem)
        ultimamensagem.push(mensagensemjson.nome + ": " + mensagensemjson.texto)
        serv.clients.forEach((client) => {
        let mensagemaenviar = mensagensemjson.nome + ": " + mensagensemjson.texto
        client.send(mensagemaenviar)
        })
    })
})
