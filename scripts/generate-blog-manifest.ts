import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import type { PostFrontMatter } from "../src/types"; // Assuming your types are here

const postsDirectory = path.join(process.cwd(), "public/content/blog");
const manifestPath = path.join(process.cwd(), "public/blog-manifest.json");

async function generateManifest() {
  try {
    console.log("Generating blog manifest (TypeScript)...");
    const filenames = await fs.readdir(postsDirectory);

    // Use a type assertion for the result of Promise.all if needed,
    // or ensure the map function's return type is correctly inferred.
    const postsMetadataPromises = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContents); // <-- Parse frontmatter here
        if (!data.slug) {
          console.warn(
            `Warning: Post "${filename}" is missing a 'slug' in its frontmatter. Skipping.`
          );
          return null;
        }
        return data as PostFrontMatter;
      });

    const resolvedPostsMetadata = await Promise.all(postsMetadataPromises);

    // Filter out any nulls (posts skipped due to missing slug)
    // and ensure TypeScript knows the type of validPosts.
    const validPosts: PostFrontMatter[] = resolvedPostsMetadata.filter(
      (post): post is PostFrontMatter => post !== null
    );

    await fs.writeFile(manifestPath, JSON.stringify(validPosts, null, 2));
    console.log(
      `Blog manifest generated successfully at ${manifestPath} with ${validPosts.length} posts!`
    );
  } catch (error) {
    console.error("Error generating blog manifest:", error);
  }
}
generateManifest();
