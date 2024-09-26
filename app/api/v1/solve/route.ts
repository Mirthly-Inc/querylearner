import { code_execution } from "@/app/utils/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { problem, code, expected } = await req.json();
  const out = await code_execution(problem, code, expected);
  return NextResponse.json({ out });
}
