// src/pages/BlogPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import type { PostFrontMatter } from "../types";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<PostFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogManifest = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/blog-manifest.json`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch blog manifest: ${response.statusText}`
          );
        }
        const manifestData: PostFrontMatter[] = await response.json();
        // Optional: Sort posts by date, newest first
        manifestData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setPosts(manifestData);
      } catch (err) {
        console.error("Error fetching blog manifest:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogManifest();
  }, []); // Empty dependency array means this runs once on mount

  if (loading)
    return (
      <p className="text-center text-neon-green animate-pulse">
        Loading posts...
      </p>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (posts.length === 0)
    return (
      <p className="text-center text-text-secondary">
        No posts found yet. Stay tuned!
      </p>
    );

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-neon-purple mb-8 text-center">
        Blog Posts
      </h1>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="p-6 bg-cyber-bg-alt rounded-lg shadow-neon-glow-green hover:shadow-neon-glow-purple transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-neon-green mb-2">
            <Link to={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>
          <p className="text-sm text-text-secondary mb-3">
            {new Date(post.date).toLocaleDateString()}
          </p>
          <p className="text-text-primary mb-4">{post.excerpt}</p>
          <Link
            to={`/blog/${post.slug}`}
            className="text-neon-purple hover:text-neon-green font-semibold"
          >
            Read more &rarr;
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogPage;
