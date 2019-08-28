import { Image } from "../imagesservice/image";

export interface BlogPostSummary {
    id: number;
    date: Date;
    subject: string;
    subjectUrl: string;
    contentIntro: string;
    image: Image;
    authorName: string;
    category: string;
    categoryId: string;
}