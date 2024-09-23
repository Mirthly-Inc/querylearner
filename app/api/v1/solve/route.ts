import { get_suggestions } from "@/app/utils/ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  await get_suggestions();
  return NextResponse.json({ msg: "All success" });
}
