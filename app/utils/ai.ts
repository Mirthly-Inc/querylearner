import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function get_suggestions() {
  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContentStream(prompt);
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
  }
}
