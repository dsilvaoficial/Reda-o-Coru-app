let usuarios = {
    "teste@teste.com": {
        senha: "123",
        creditos: 10
    }
};

export default function handler(req, res) {
    const { email } = req.query;

    const user = usuarios[email];

    if (!user) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.status(200).json({
        creditos: user.creditos
    });
}
