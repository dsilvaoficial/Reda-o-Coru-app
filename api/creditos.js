import jwt from "jsonwebtoken";

const SECRET = "segredo_super_secreto";

let usuarios = {
    "teste@teste.com": {
        senha: "123",
        creditos: 10
    }
};

export default function handler(req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, SECRET);

        const user = usuarios[decoded.email];

        res.status(200).json({
            creditos: user.creditos
        });

    } catch {
        res.status(401).json({ erro: "Não autorizado" });
    }
}
