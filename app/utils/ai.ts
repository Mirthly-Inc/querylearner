import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function get_suggestions(
  problem: string,
  code: string,
  error: string
) {
  console.log("Reached generatio part");
  const prompt = `You will receive a coding problem, user written code, error in the code after execution
                    You will use the Socratic method to answer the question.For example:Instead of saying time limit
                    exceeded, give the user some hint to look out instead of revealing the time limit exceeded finally
                    making the user to understand the error.
                    
                    problem:${problem}
                    code:${code}
                    error:${error}
                    Return: {'suggestion': "Give suggestions as per the instructions."}s`;

  const result = await model.generateContentStream(prompt);
  const ref = (await result.response).text();
  return ref;
}

export async function code_execution(problem: string, code: string) {
  console.log("Entered");
  // try {
  //   const encodedSourceCode = btoa(code);

  //   // API request options
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       "Content-Type": "application/json",
  //       "x-rapidapi-key": "0875e2be83mshbb78dca9101e1aep17df79jsn6093ba6a2a61",
  //       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  //     },
  //     body: JSON.stringify({
  //       language_id: 62,
  //       source_code: encodedSourceCode,
  //     }),
  //   };

  //   // Make the API request
  //   await fetch(
  //     "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  //   // const ans = await get_suggestions(problem, code, error);
  // } catch (error) {
  //   console.error(error);
  // }

  // Replace 'YOUR_SUBMISSION_TOKEN' with the actual token you received from the POST request
  const submissionToken = "6bc8dfe8-4469-41c2-8efa-f67786b79919";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0875e2be83mshbb78dca9101e1aep17df79jsn6093ba6a2a61",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  await fetch(
    `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=true&fields=*`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.error("Error:", err));
  console.log("Exited");
  return "Statcox";
}
