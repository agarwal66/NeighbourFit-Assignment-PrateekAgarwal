import connectMongoDB from "@/app/_lib/mongodb";
import Match from "@/app/_models/matchModel";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    const matches = await Match.find({});
    return NextResponse.json(matches, { status: 200 });
  } catch (error) {
    console.error("Error fetching match data:", error);
    return NextResponse.json(
      { message: "Failed to fetch match data" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const { preferences } = await req.json();

    const allMatches = await Match.find({}).lean();

    const scored = allMatches.map((item) => {
      const score = preferences.reduce((sum, pref) => sum + item[pref], 0);
      return { ...item, score };
    });

    // Optional: sort by score descending
    const sorted = scored.sort((a, b) => b.score - a.score);

    return NextResponse.json(sorted, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
