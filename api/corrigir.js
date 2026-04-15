import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔥 BANCO FAKE (por enquanto)
let usuarios = {
  "teste@teste.com": {
    senha: "123",
    creditos: 10
  }
};

export default async function handler(req, res) {
  try {
    const { texto, email } = req.body;

    const user = usuarios[email];

    if (!user) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    if (user.creditos <= 0) {
      return res.status(403).json({ erro: "Sem créditos" });
    }

    // 🔥 CONECTA NA IA
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    const prompt = `
Você é um corretor de redações do ENEM.
Corrija o texto e dê sugestões de melhoria.

Texto:
${texto}
`;

    const result = await model.generateContent(prompt);
    const resposta = result.response.text();

    // 🔥 DIMINUI CRÉDITO (só depois que deu certo)
    user.creditos--;

    res.status(200).json({
      resultado: resposta,
      creditos: user.creditos
    });

  } catch (e) {
    console.error("ERRO REAL:", e);

    res.status(500).json({
      erro: "Erro ao corrigir redação"
    });
  }
      }
