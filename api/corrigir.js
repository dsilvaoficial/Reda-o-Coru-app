import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {

  try{
    const { texto } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const apiKey = process.env.GEMINI_API_KEY;
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite"
    });

    const prompt = `
Você é um corretor de redações do ENEM.
Corrija o texto e dê sugestões.

Texto:
${texto}
`;

    const result = await model.generateContent(prompt);
    const resposta = result.response.text();

    res.status(200).json({
      resultado: resposta,
      creditos: 10
    });

  } catch(e){
    res.status(500).json({
      erro:"Erro ao corrigir"
    });
  }

}
