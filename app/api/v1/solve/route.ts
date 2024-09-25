import { code_execution } from "@/app/utils/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { problem, code } = await req.json();
  const out = await code_execution(problem, code);
  return NextResponse.json({ out });
}
