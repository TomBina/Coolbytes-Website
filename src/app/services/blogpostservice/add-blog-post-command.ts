import { ExternalLink } from "./external-link";
export interface AddBlogPostCommand {
    subject: string;
    contentIntro: string;
    content: string;
    tags?: string[];
    categoryId: number;
    externalLinks: ExternalLink[];
}