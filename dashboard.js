async function corrigir() {

    console.log("Botão clicado");

    let texto = document.getElementById("texto").value;

    document.getElementById("resultado").innerHTML = "Corrigindo...";

    try {
        let token = localStorage.getItem("token");

   let resposta = await fetch("/api/corrigir", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // 🔥 AQUI
    },
    body: JSON.stringify({ texto })
});

        if (!resposta.ok) {
       let erro = await resposta.json();
        alert(erro.erro);
        return;
        }
        let data = await resposta.json();

        // Back-end 
        console.log("Resposta recebida", data);
        
        document.getElementById("creditos").innerText = data.creditos;

        document.getElementById("resultado").innerHTML = `
            <h3>Resultado</h3>
            <p>${data.resultado}</p>
        `;

    } catch (erro) {
        console.error("Erro:", erro);

        document.getElementById("resultado").innerHTML = `
            <p style="color:red;">Erro ao corrigir. Tente novamente.</p>
        `;
    }
                             }

async function carregarCreditos() {
    const email = localStorage.getItem("email");

    let resposta = await fetch(`/api/creditos?email=${email}`);
    let data = await resposta.json();

    document.getElementById("creditos").innerText = data.creditos;
}

window.onload = carregarCreditos;
        
