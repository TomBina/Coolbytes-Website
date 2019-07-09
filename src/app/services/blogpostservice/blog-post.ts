import { Author } from "../authorsservice/author";
import { Image } from "../imagesservice/image";
import { ExternalLink } from "./external-link";
import { BlogPostLink } from "./blog-post-link";
import { BlogPostTag } from "./blog-post-tag";

export interface BlogPost {
    id: number;
    date: Date;
    updated: Date;
    subject: string;
    subjectUrl: string;
    contentIntro: string;
    content: string;
    tags: BlogPostTag[];
    image: Image;
    author: Author;
    externalLinks: ExternalLink[];
    category: string;
    categoryId: number;
}