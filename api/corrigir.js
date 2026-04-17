import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt from "jsonwebtoken";

const SECRET = "segredo_super_secreto";

let usuarios = {
    "teste@teste.com": {
        senha: "123",
        creditos: 10
    }
};

export default async function handler(req, res) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ erro: "Token não enviado" });
        }

        const token = authHeader.split(" ")[1];

        // 🔐 VALIDAR TOKEN
        const decoded = jwt.verify(token, SECRET);
        const email = decoded.email;

        const user = usuarios[email];

        if (!user) {
            return res.status(401).json({ erro: "Usuário inválido" });
        }

        if (user.creditos <= 0) {
            return res.status(403).json({ erro: "Sem créditos" });
        }

        user.creditos--;

        // IA (seu código atual)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite"
        });

        const prompt = `Você é um corretor de redações do ENEM.
Corrija o texto e dê sugestões de melhoria: ${req.body.texto}`;

        const result = await model.generateContent(prompt);
        const resposta = result.response.text();

        res.status(200).json({
            resultado: resposta,
            creditos: user.creditos
        });

    } catch (e) {
        return res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}
