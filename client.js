

let soc = new WebSocket("wss://chat-xmta.onrender.com");

const texto = document.querySelector(".texto")
const botao = document.querySelector(".botao")
const imagem = document.querySelector(".imagem")
const mensagem = document.querySelector(".mensage")
const div = document.querySelector(".div")
const nome = document.querySelector(".nome")
const input = document.querySelector(".inputtambem")
const som = new Audio("efeito.mp3")
const salvar = document.querySelector(".salvar")
let nomeval = localStorage.getItem("nome")
som.volume = 0.5
let tempo = 0
soc.onopen = () => {
    console.log("olha, conecto aq")
}

if (nome !== null) {
    nome.value = nomeval
}

document.addEventListener("keydown", async (info) => {
    if (info.key === "Enter") {
        info.preventDefault()
        if (performance.now() - tempo >= 200 && texto.value != "") {
    let podemandar = true
    if (soc.readyState !== 1) {
        let texto = document.createElement("h4")
        texto.textContent = "You aren't connected to the server. The server can be off or you disconnected. Please, restart. If appears again, wait some time and try again."
        texto.className = "error"
        div.appendChild(texto)
    }
    if (nome.value == "") {
        let texto = document.createElement("h4")
        texto.textContent = "You didn't choosed your name."
        texto.className = "error"
        div.appendChild(texto)
        podemandar = false
    }
    if (podemandar) {
    if (input.files[0]) {
    const imagembuff = await input.files[0].arrayBuffer()
    console.log(imagembuff)
    soc.send(JSON.stringify({texto: texto.value, nome: nome.value}))
    soc.send(imagembuff)
    texto.value = ""
    input.value = ""
        }
    else {
    soc.send(JSON.stringify({texto: texto.value, nome: nome.value}))
    texto.value = ""
    tempo = performance.now()
    }}}
}})

imagem.addEventListener("click", () => {
    input.click()
})

botao.addEventListener("click", async () => {
    if (performance.now() - tempo >= 200 && texto.value != "") {
    let podemandar = true
    if (soc.readyState !== 1) {
        let texto = document.createElement("h4")
        texto.textContent = "You aren't connected to the server. The server can be off or you disconnected. Please, restart. If appears again, wait some time and try again."
        texto.className = "error"
        div.appendChild(texto)
    }
    if (nome.value == "") {
        let texto = document.createElement("h4")
        texto.textContent = "You didn't choosed your name."
        texto.className = "error"
        div.appendChild(texto)
        podemandar = false
    }
    if (podemandar) {
        if (input.files[0]) {
    const imagembuff = await input.files[0].arrayBuffer()
    console.log(imagembuff)
    soc.send(JSON.stringify({texto: texto.value, nome: nome.value}))
    soc.send(imagembuff)
    texto.value = ""
        }
    else {
    soc.send(JSON.stringify({texto: texto.value, nome: nome.value}))
    texto.value = ""
    }}}
})

soc.onmessage = (mensage) => {
    let ejson = false
    let mensagemsemjson
    try {
    mensagemsemjson = JSON.parse(mensage.data)
    ejson = true
    }
    catch {

    }
    if (document.hidden) {
        som.pause
        som.currentTime = 0
        som.play()
    }


    if (ejson) {
    let texto = document.createElement("h2")
    let textonome = document.createElement("h2")
    textonome.textContent = mensagemsemjson.nome + ":"
    textonome.className = "nomemensagem"
    texto.className = "mensagem"
    texto.textContent = mensagemsemjson.texto
    div.appendChild(textonome)
    div.appendChild(texto)
    div.scrollTop = div.scrollHeight
    console.log(mensagemsemjson)
}
else {
    const imagem = document.createElement("img")
    const url = URL.createObjectURL(mensage.data)
    imagem.src = url
    div.appendChild(imagem)
}
}

salvar.addEventListener("click", () => {
localStorage.setItem("nome", nome.value)
})