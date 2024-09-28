import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full font-sans flex h-screen items-center flex-col justify-center">
      <div className="text-5xl font-semibold pb-4">Welcome to QueryLearner</div>
      <div className="pb-8">
        Master coding with the Socratic method. Level up your coding skills with
        AI
      </div>
      <Link
        href="/solve"
        className="p-2 px-4 bg-white text-black rounded-lg font-semibold cursor-pointer text-xl"
      >
        See Demo
      </Link>
    </div>
  );
}
