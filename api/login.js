import jwt from "jsonwebtoken";

const SECRET = "segredo_super_secreto"; // depois vamos melhorar isso

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

    // 🔐 CRIA TOKEN
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1d" });

    res.status(200).json({
        mensagem: "Login ok",
        token
    });
}
