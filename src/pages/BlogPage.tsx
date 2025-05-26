// src/pages/BlogPage.tsx
import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import type { PostFrontMatter } from "../types";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<PostFrontMatter[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

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

        // Extract all unique tags
        const uniqueTags = new Set<string>();
        manifestData.forEach((post) =>
          post.tags?.forEach((tag) => uniqueTags.add(tag))
        );
        setAllTags(Array.from(uniqueTags).sort());
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

  const handleArticleClick = (
    slug: string,
    e: React.MouseEvent<HTMLElement>
  ) => {
    // Prevent navigation if a link or button inside the article was clicked
    if ((e.target as HTMLElement).closest("a, button")) return;
    navigate(`/blog/${slug}`);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(
      (prevTags) =>
        prevTags.includes(tag)
          ? prevTags.filter((t) => t !== tag) // Deselect if already selected
          : [...prevTags, tag] // Select if not selected
    );
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearchTerm =
        searchTerm.trim() === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => post.tags?.includes(tag));

      return matchesSearchTerm && matchesTags;
    });
  }, [posts, searchTerm, selectedTags]);

  if (loading)
    return (
      <p className="text-center text-neon-green animate-pulse">
        Loading posts...
      </p>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-neon-purple mb-8 text-center">
        Blog Posts
      </h1>

      {/* Search and Filter Controls */}
      <div className="mb-10 p-4 md:p-6 bg-cyber-bg-alt rounded-lg shadow-md">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts by title or excerpt..."
            className="w-full p-3 bg-cyber-dark border border-border-medium rounded-md text-text-primary focus:ring-2 focus:ring-neon-green focus:border-neon-green outline-none placeholder-text-secondary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {allTags.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-neon-green mb-3">
              Filter by Tags:
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer ${
                    // Added cursor-pointer
                    selectedTags.includes(tag)
                      ? "bg-neon-purple text-accent-white shadow-neon-glow-purple"
                      : "bg-cyber-bg-alt-2 border border-border-light text-text-secondary hover:bg-neon-green hover:text-cyber-dark hover:border-neon-green"
                  }`}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-4 py-2 rounded-md text-sm font-medium text-red-400 hover:text-red-300 border border-red-400 hover:border-red-300 transition-colors cursor-pointer" // Added cursor-pointer
                >
                  Clear Tags
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Posts Grid/List */}
      {filteredPosts.length === 0 && !loading && (
        <p className="text-center text-text-secondary text-lg py-10">
          No posts match your criteria. Try adjusting your search or filters!
        </p>
      )}
      <div className="space-y-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="p-6 bg-cyber-bg-alt rounded-lg shadow-neon-glow-green hover:shadow-neon-glow-purple transition-shadow duration-300 cursor-pointer" // Added cursor-pointer
            onClick={(e) => handleArticleClick(post.slug, e)}
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
            {post.tags && post.tags.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-text-secondary font-semibold mr-2">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to="#" // Or make tags clickable to filter
                    onClick={(e) => {
                      e.preventDefault();
                      handleTagClick(tag);
                    }}
                    className={`inline-block bg-cyber-bg-alt-2 text-xs text-neon-green px-2 py-1 rounded mr-2 mb-1 border border-neon-green hover:bg-neon-green hover:text-cyber-dark transition-colors
                    ${
                      selectedTags.includes(tag)
                        ? "ring-2 ring-neon-purple ring-offset-2 ring-offset-cyber-bg-alt"
                        : ""
                    }
                  `}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            <Link
              to={`/blog/${post.slug}`}
              className="text-neon-purple hover:text-neon-green font-semibold"
            >
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
