export interface PostFrontMatter {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage?: string;
  tags?: string[];
}

export interface Post extends PostFrontMatter {
  content: string; // Markdown content string
}
