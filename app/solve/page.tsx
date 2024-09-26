"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Solve() {
  const [data, setData] = useState("");

  const handleClick = async () => {
    console.log("Clicked");
    const res = await fetch("http://localhost:3000/api/v1/solve", {
      method: "POST",
      body: JSON.stringify({
        problem: `Binary Search, Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.`,
        code: `class Main {
                  public static void main(String[] args){
                      int[] arr = {5};
                      int target = 5;
                      int solution = search(arr,target);
                      System.out.println(solution);
                  }

                  public static int search(int[] nums, int target) {
                      if(target>nums[nums.length-1] || target<nums[0]){
                          return -1;
                      }
                      int start = 0;
                      int end = nums.length-1;
                      while(start<end){
                          int mid = start + (end - start)/2;
                          if(nums[mid]==target){
                              return mid;
                          }
                          if(nums[mid]>target){
                              end = mid - 1;
                          }else{
                              start = mid+1;
                          }
                      }
                      return -1;
                  }
                }`,
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
      <textarea className="h-fit w-full border-2 border-white text-black p-4" />
      <button
        onClick={handleClick}
        className="border-2 border-white p-2 rounded-lg hover:bg-neutral-900"
      >
        Click to solve
      </button>
      <ReactMarkdown className="text-white text-xl pt-10 border-2 border-white justify-center p-4">
        {data}
      </ReactMarkdown>
    </div>
  );
}
