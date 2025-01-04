import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return mock data for now
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Return mock response
    return NextResponse.json({
      ...data,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      author: { name: "Mock User" },
      likes: [],
      dislikes: [],
      comments: []
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}