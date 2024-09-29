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
  try {
    const encodedSourceCode = btoa(code);
    const submissionToken = await submitCode(encodedSourceCode);
    const result = await getSubmissionResult(submissionToken);
    const stdoutput = atob(result.stdout).trim();
    console.log(result);
    console.log(expected);
    console.log(typeof stdoutput);
    console.log(typeof expected);
    if (stdoutput === expected) {
      return "success";
    } else {
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
      "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY!,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST!,
    },
    body: JSON.stringify({
      //language ID for java
      language_id: 62,
      source_code: encodedSourceCode,
    }),
  };

  const response = await fetch(
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
    options
  );
  const data = await response.json();
  return data.token;
}

async function getSubmissionResult(submissionToken: string) {
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY!,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST!,
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(
    `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=true&fields=*`,
    options
  );
  return await response.json();
}
