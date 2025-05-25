// src/pages/BlogPostPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";
import type { Post } from "../types";

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/content/blog/${slug}.md`);
        if (!response.ok) {
          throw new Error(`Blog post not found: ${slug}`);
        }
        const markdownWithMeta = await response.text();
        const { data, content } = matter(markdownWithMeta);
        setPost({ ...(data as Omit<Post, "content">), content });
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center text-neon-green animate-pulse">
        Loading post...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">
        Error: {error}{" "}
        <Link to="/blog" className="underline hover:text-neon-green">
          Go back to blog
        </Link>
      </p>
    );
  if (!post)
    return (
      <p className="text-center text-text-secondary">
        Post not found.{" "}
        <Link to="/blog" className="underline hover:text-neon-green">
          Go back to blog
        </Link>
      </p>
    );

  return (
    <article
      className="prose prose-invert lg:prose-xl mx-auto max-w-none 
                        prose-headings:text-neon-green prose-a:text-neon-purple hover:prose-a:text-neon-green 
                        prose-strong:text-text-primary prose-code:text-neon-orange prose-code:bg-cyber-bg-alt prose-code:p-1 prose-code:rounded
                        prose-ul:pl-10 prose-ol:pl-10
                        prose-blockquote:border-l-neon-purple prose-blockquote:text-text-secondary"
    >
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold !text-neon-purple mb-3">
          {post.title}
        </h1>
        <p className="text-text-secondary text-sm">
          Published on {new Date(post.date).toLocaleDateString()}
          {post.tags && post.tags.length > 0 && (
            <span className="ml-2">| Tags: {post.tags.join(", ")}</span>
          )}
        </p>
      </header>
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-auto max-h-[400px] object-cover rounded-md mb-8 shadow-lg border-2 border-neon-green"
        />
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      <div className="mt-12 text-center">
        <Link
          to="/blog"
          className="text-neon-green hover:text-neon-purple font-semibold border border-neon-green hover:border-neon-purple px-6 py-3 rounded-md transition-colors duration-300"
        >
          &larr; Back to Blog
        </Link>
      </div>
    </article>
  );
};

export default BlogPostPage;
