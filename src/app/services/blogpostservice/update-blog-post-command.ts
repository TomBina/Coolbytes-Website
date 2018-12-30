import { ExternalLink } from "./external-link";
export interface UpdateBlogPostCommand {
    id: number;
    subject: string;
    contentIntro: string;
    content: string;
    tags?: string[];
    externalLinks: ExternalLink[];
}