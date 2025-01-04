import { NextResponse } from "next/server";
import { auth } from "../../../../../lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { AngryIcon } from "lucide-react";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const blog = await Blog.findById(params.id);
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const userLiked = blog.likes.includes(session.user.id);
    
    if (userLiked) {
      blog.likes = blog.likes.filter((id:any) => id.toString() !== session.user.id);
    } else {
      blog.likes.push(session.user.id);
      blog.dislikes = blog.dislikes.filter((id:any) => id.toString() !== session.user.id);
    }

    await blog.save();
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 });
  }
}