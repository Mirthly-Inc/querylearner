export default function SolveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex border-2 border-white h-screen">
      <div className="text-white text-2xl w-2/3 m-4 rounded-lg p-4 bg-neutral-800">
        <div className="font-semibold">1. Binary Search</div>
        <div className="text-base pt-4 flex flex-col gap-2">
          <div>
            Given an array of integers nums which is sorted in ascending order,
            and an integer target, write a function to search target in nums.
          </div>
          <div>
            If target exists, then return its index. Otherwise, return -1.
          </div>
          <div>
            You must write an algorithm with <b>O(log n)</b> runtime complexity.
          </div>
        </div>
        <div className="text-base pt-10">
          <div>
            <div>Example 1:</div>
            <div>Input: nums = [-1,0,3,5,9,12], target = 9</div>
            <div>Output: 4</div>
            <div>Explanation: 9 exists in nums and its index is 4</div>
          </div>
          <div className="pt-10">
            <div> Example 2:</div>
            <div>Input: nums = [-1,0,3,5,9,12], target = 2 </div>
            <div>Output: -1</div>
            <div> Explanation: 2 does not exist in nums so return -1</div>
          </div>
        </div>
      </div>
      <div className="w-full py-4 pr-4">{children}</div>
    </div>
  );
}
