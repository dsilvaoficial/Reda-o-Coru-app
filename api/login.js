export default async function handler(req, res) {
  const { email, senha } = req.body

  // teste simples
  if(email === "admin@test.com" && senha === "123"){
    res.status(200).json({ sucesso: true })
  } else {
    res.status(200).json({ sucesso: false })
  }
}
