let usuarios = {
  "teste@teste.com": {
    senha: "123",
    creditos: 10
  }
};

export default function handler(req, res) {
  const { email, senha } = req.body;

  const user = usuarios[email];

  if (!user || user.senha !== senha) {
    return res.status(401).json({ erro: "Login inválido" });
  }

  res.status(200).json({
    mensagem: "Login ok",
    email: email
  });
}
