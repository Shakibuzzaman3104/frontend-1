import { defaultMovies } from "@/constant/movies";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(defaultMovies);
}
