import { NextResponse } from "next/server";
import { auth } from "../../../../../lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content } = await req.json();
    await connectToDatabase();
    
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blog.comments.push({
      user: session.user.id,
      content,
    });

    await blog.save();
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}