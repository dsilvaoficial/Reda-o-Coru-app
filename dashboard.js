async function corrigir(){

  console.log("Botão clicado");

  let texto = document.getElementById("texto").value

  let resposta = await fetch("/api/corrigir",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({texto})
  })

  let creditos = localStorage.getItem("creditos") || 0;

  if (creditos <= 0) { alert("Você não tem mais créditos!");
    return;
 }
  
document.getElementById("resultado").innerText = creditos;
  let data = await resposta.json()

  console.log("Resposta recebida", data);

  document.getElementById("resultado").innerHTML = `
  <h3>Resultado</h3>
  <p>${data.resultado}</p>
  <p>Créditos: ${data.creditos}</p>
  `
}

function sair(){
  window.location.href = "login.html"
}
