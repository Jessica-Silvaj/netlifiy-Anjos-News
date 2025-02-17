document.querySelector(".form-contato").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    const resposta = await fetch("/.netlify/functions/envioEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, mensagem }),
    });

    const data = await resposta.json();
    mostrarAlerta(data.status, data.message);

     // Limpa os campos após envio bem-sucedido
     if (data.status === "success") {
        document.querySelector(".form-contato").reset();
    }
});

// Função para exibir alertas coloridos
function mostrarAlerta(tipo, mensagem) {
    const alerta = document.createElement("div");
    alerta.classList.add("alerta", `alerta-${tipo}`);
    alerta.innerText = mensagem;

    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 5000);
}