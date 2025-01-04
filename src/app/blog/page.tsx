"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { CreateBlogDialog } from "@/components/blog/CreateBlogDialog";

export default function BlogPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then(setBlogs);
  }, []);

  return (
    <div className="container py-8">
      <PageHeader
        title="School Blog"
        description="Share and discover stories from our school community"
      >
        {session && <CreateBlogDialog />}
      </PageHeader>

      <div className="grid gap-8">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}