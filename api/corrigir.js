export default async function handler(req, res) {
  const { texto } = req.body

  const resposta = "Teste funcionando: " + texto

  res.status(200).json({
    resultado: resposta,
    creditos: 10
  })
}
