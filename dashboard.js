async function corrigir(){

  let texto = document.getElementById("texto").value

  let resposta = await fetch("/api/corrigir",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({texto})
  })

  let data = await resposta.json()

  document.getElementById("resultado").innerHTML =
  `
  <h3>Resultado</h3>
  <p>${data.resultado}</p>
  <p>Créditos: ${data.creditos}</p>
  `
}

function sair(){
  window.location.href = "login.html"
}
