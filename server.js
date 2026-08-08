let websoc = require("ws")
let serv = new websoc.WebSocket.Server({ port: 3000 });
let ultimamensagem = []

serv.on("connection", (socket) => {
    if (ultimamensagem[1]) {
    for (const mensagem of ultimamensagem) {
    socket.send(mensagem)
    }}
    socket.on("message", (mensagem) => {
        let ejson = false
        let mensagemsemjson
        try {
        mensagensemjson = JSON.parse(mensagem)
        ejson = true
        }
        catch {}
        console.log(mensagem)
        if (ejson) {
        ultimamensagem.push(JSON.stringify({nome: mensagensemjson.nome, texto: mensagensemjson.texto}))
        serv.clients.forEach((client) => {
        let mensagemaenviar = JSON.stringify({nome: mensagensemjson.nome, texto: mensagensemjson.texto})
        console.log(mensagemaenviar)
        client.send(mensagemaenviar)
        })
    }
    else {
        ultimamensagem.push(mensagem)
        serv.clients.forEach((client) => {
        let mensagemaenviar = mensagem
        client.send(mensagemaenviar)
    })}
})})
