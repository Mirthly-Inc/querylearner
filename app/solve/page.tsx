"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";

export default function Solve() {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");

  const handleClick = async () => {
    console.log("Clicked");
    const res = await fetch("http://localhost:3000/api/v1/solve", {
      method: "POST",
      body: JSON.stringify({
        problem: `Binary Search, Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.`,
        code: value,
        expected: "0",
      }),
    }).then((response) => response.json());

    if (res.output === "success") {
      setData("Submission Successful");
    } else {
      setData(res.output);
    }
    console.log(res);
  };
  return (
    <div className="w-full rounded-lg bg-neutral-800 h-full flex-col">
      <div className="p-3 border-b border-white">Code</div>
      <Editor
        height="80vh"
        theme="vs-dark"
        language="java"
        value={value}
        onChange={(value) => setValue(value)}
        defaultValue={`\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tint[] arr = {5};\n\t\tint target = 5;\n\t\tSystem.out.println(search(nums,target));\n\t}
          \n\tpublic static int search(int[] nums, int target) {\n\t\t//write your code here\n\n\t}\n}\n`}
      />
      <button
        // onClick={handleClick}
        onClick={() => console.log(value)}
        className="border-2 border-white p-2 rounded-lg hover:bg-neutral-900"
      >
        Click to solve
      </button>
      {/* <ReactMarkdown className="text-white text-xl pt-10 border-2 border-white justify-center p-4">
        {data}
      </ReactMarkdown> */}
    </div>
  );
}
