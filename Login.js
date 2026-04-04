async function login(){
  let email = document.getElementById("email").value
  let senha = document.getElementById("senha").value

  let res = await fetch("/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({email, senha})
  })

  let data = await res.json()

  if(data.sucesso){
    window.location.href = "dashboard.html"
  }else{
    alert("Login inválido")
  }
}
