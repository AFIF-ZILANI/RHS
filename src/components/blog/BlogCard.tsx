"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
    blog: {
        _id: string;
        title: string;
        content: string;
        image?: string;
        author: {
            name: string;
            image?: string;
        };
        likes: string[];
        dislikes: string[];
        comments: Array<{
            user: {
                name: string;
            };
            content: string;
            createdAt: string;
        }>;
        createdAt: string;
    };
}

export function BlogCard({ blog }: BlogCardProps) {
    const session = { user: { id: "123" } };
    // const { data: session } = useSession();
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState(blog.likes);
    const [dislikes, setDislikes] = useState(blog.dislikes);
    const [comments, setComments] = useState(blog.comments);

    const handleLike = async () => {
        if (!session) return;
        try {
            const res = await fetch(`/api/blog/${blog._id}/like`, {
                method: "POST",
            });
            if (res.ok) {
                const data = await res.json();
                setLikes(data.likes);
                setDislikes(data.dislikes);
            }
        } catch (error) {
            console.error("Failed to update like:", error);
        }
    };

    const handleComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session || !comment.trim()) return;
        try {
            const res = await fetch(`/api/blog/${blog._id}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: comment }),
            });
            if (res.ok) {
                const data = await res.json();
                setComments(data.comments);
                setComment("");
            }
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                            <Image
                                src={
                                    blog.author.image ||
                                    "/placeholder-avatar.jpg"
                                }
                                alt={blog.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                {blog.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                By {blog.author.name} •{" "}
                                {formatDate(blog.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {blog.image && (
                        <div className="relative aspect-video">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    )}
                    <p className="whitespace-pre-wrap">{blog.content}</p>

                    <div className="flex items-center gap-4 pt-4 border-t">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={
                                likes.includes(session?.user.id || "")
                                    ? "text-blue-500"
                                    : ""
                            }
                        >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            {likes.length}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={
                                dislikes.includes(session?.user.id || "")
                                    ? "text-red-500"
                                    : ""
                            }
                        >
                            <ThumbsDown className="h-4 w-4 mr-2" />
                            {dislikes.length}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowComments(!showComments)}
                        >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {comments.length}
                        </Button>
                    </div>

                    {showComments && (
                        <div className="space-y-4 pt-4">
                            {session && (
                                <form
                                    onSubmit={handleComment}
                                    className="flex gap-2"
                                >
                                    <Textarea
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        placeholder="Add a comment..."
                                        className="flex-grow"
                                    />
                                    <Button type="submit">Post</Button>
                                </form>
                            )}

                            <div className="space-y-4">
                                {comments.map((comment, i) => (
                                    <div key={i} className="flex gap-2">
                                        <div className="flex-grow space-y-1">
                                            <p className="text-sm font-medium">
                                                {comment.user.name}
                                            </p>
                                            <p className="text-sm">
                                                {comment.content}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(comment.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
