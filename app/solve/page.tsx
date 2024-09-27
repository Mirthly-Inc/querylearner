"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Solve() {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) {
      return;
    }
    console.log("Clicked");
    setLoading(true);
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
    setLoading(false);
  };
  return (
    <div className="w-full rounded-lg bg-neutral-800 h-full flex-col text-white">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={75}>
          <div className="p-3 border-b border-white">Code</div>
          <Editor
            height="80vh"
            theme="vs-dark"
            language="java"
            value={value}
            onChange={(value) => {
              if (value) {
                setValue(value);
              }
            }}
            defaultValue={`\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tint[] arr = {5};\n\t\tint target = 5;\n\t\tSystem.out.println(search(nums,target));\n\t}
          \n\tpublic static int search(int[] nums, int target) {\n\t\t//write your code here\n\n\t}\n}\n`}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <div className=" h-full">
            <div className="flex w-full justify-between px-4  bg-neutral-700 items-center ">
              <div className="p-4">Your suggestions will appear below</div>
              <button
                onClick={handleClick}
                className="bg-violet-600 p-2 px-4 rounded-lg hover:bg-violet-900"
              >
                {loading ? (
                  <div className="cursor-not-allowed">Analyzing Code...</div>
                ) : (
                  "Click to solve"
                )}
              </button>
            </div>
            {data.length !== 0 && (
              <ReactMarkdown className="text-white text-base pt-4 justify-center p-4">
                {data}
              </ReactMarkdown>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
