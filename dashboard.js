async function corrigir() {

    let creditos = parseInt(localStorage.getItem("creditos")) || 0;

    if (creditos <= 0) {
        alert("Você não tem mais créditos!");
        return;
    }

    console.log("Botão clicado");

    let texto = document.getElementById("texto").value;

    document.getElementById("resultado").innerHTML = "Corrigindo...";

    try {
        let email = localStorage.getItem("email");
        
        let resposta = await fetch("/api/corrigir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ texto, email })
        });

        let data = await resposta.json();

        // DIMINUI CRÉDITO
        creditos--;
        localStorage.setItem("creditos", creditos);

        document.getElementById("creditos").innerText = creditos;

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

        
