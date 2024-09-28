import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex h-screen items-center flex-col gap-8 justify-center">
      <div className="text-3xl font-semibold">Welcome to QueryLearner</div>
      <Link
        href="/solve"
        className="p-2 px-4 bg-white text-black rounded-lg font-semibold cursor-pointer text-xl"
      >
        See Demo
      </Link>
    </div>
  );
}
