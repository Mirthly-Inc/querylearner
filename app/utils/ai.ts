import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function get_suggestions(
  problem: string,
  code: string,
  error: string
) {
  const prompt = `You will receive a coding problem, user written code, error in the code after execution
                    You will use the Socratic method to answer the question.For example:Instead of saying time limit
                    exceeded, give the user some hint to look out instead of revealing the time limit exceeded finally
                    making the user to understand the error.
                    
                    problem:${problem}
                    code:${code}
                    error:${error}
                    Recipe = {'suggestion': "Give suggestions as per the instructions."}
                    Return: Recipe`;

  const result = await model.generateContentStream(prompt);
  return result;
}

export async function code_execution(problem: string, code: string) {
  const error = "time limit exceeded";
  const ans = await get_suggestions(problem, code, error);
  console.log(ans);
  return ans;
}
