import { BlogPostSummary } from "./blog-post-summary";

export interface BlogPostOverview {
    categories: BlogPostOverviewCategory[];
}

export interface BlogPostOverviewCategory {
    categoryId: number;
    category: string;
    blogPosts: BlogPostSummary[];
}