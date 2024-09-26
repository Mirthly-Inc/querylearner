import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function get_suggestions(
  problem: string,
  code: string,
  error: string,
  expected: string,
  possible_err: string
) {
  console.log("Reached generatio part");
  const prompt = `You will receive a coding problem, user written code, error in the code after execution
                    You will use the Socratic method to answer the question.For example:Instead of saying time limit
                    exceeded, give the user some hint to look out instead of revealing the time limit exceeded finally
                    making the user to understand the error or the wrong output.
                    
                    problem:${problem}
                    code:${code}
                    error or output:${error}
                    expected_output:${expected}
                    Std_error:${possible_err ? possible_err : ""}
                    Return: {'suggestion': "Give suggestions only do not say about the error."}`;

  const result = await model.generateContentStream(prompt);
  const ref = (await result.response).text();
  return ref;
}

export async function code_execution(
  problem: string,
  code: string,
  expected: string
) {
  console.log("Entered");
  try {
    const encodedSourceCode = btoa(code);
    const submissionToken = await submitCode(encodedSourceCode);
    const result = await getSubmissionResult(submissionToken);
    console.log(result);
    const stdoutput = atob(result.stdout).trim();
    console.log(result.stdout);
    if (stdoutput === expected) {
      console.log("Success");
      return "success";
    } else {
      console.log(stdoutput);
      const possible_err = atob(result.stderr);
      return await get_suggestions(
        problem,
        code,
        stdoutput,
        expected,
        possible_err
      );
    }
  } catch (error) {
    console.error("Error in code execution:", error);
    return "Error occurred during code execution";
  }
}

async function submitCode(encodedSourceCode: string) {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-key": "0875e2be83mshbb78dca9101e1aep17df79jsn6093ba6a2a61",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      language_id: 62,
      source_code: encodedSourceCode,
    }),
  };

  const response = await fetch(
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
    options
  );
  const data = await response.json();
  console.log(data);
  console.log(data.token);

  return data.token;
}

async function getSubmissionResult(submissionToken: string) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0875e2be83mshbb78dca9101e1aep17df79jsn6093ba6a2a61",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=true&fields=*`,
    options
  );
  return await response.json();
}
