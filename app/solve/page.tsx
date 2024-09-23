"use client";
export default function Solve() {
  const handleClick = async () => {
    const res = await fetch("http://localhost:3000/api/v1/solve", {
      method: "POST",
      body: JSON.stringify({
        problem: `Two Sum`,
        code: `console.log("Hello World")`,
      }),
    }).then((response) => response.json());
    console.log(res);
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <button
        onClick={handleClick}
        className="border-2 border-white p-2 rounded-lg hover:bg-neutral-900"
      >
        Click to solve
      </button>
    </div>
  );
}
