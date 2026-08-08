let soc = new WebSocket("ws://localhost:3000");

const texto = document.querySelector(".texto")
const botao = document.querySelector(".botao")
const mensagem = document.querySelector(".mensage")
const div = document.querySelector(".div")
const nome = document.querySelector(".nome")
soc.onopen = () => {
    console.log("olha, conecto aq")
}

document.addEventListener("keydown", (info) => {
    if (info.key === "Enter") {
        info.preventDefault()
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
    soc.send(JSON.stringify({texto: texto.value, nome: nome.value}))
    texto.value = ""
    }
    }
})

botao.addEventListener("click", () => {
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
    soc.send(JSON.stringify({texto: texto.value, nome: nome.value}))
    texto.value = ""
    }
})

soc.onmessage = (mensage) => {
    let texto = document.createElement("h2")
    texto.textContent = mensage.data
    div.appendChild(texto)
    div.scrollTop = div.scrollHeight
    console.log(mensage.data)
}