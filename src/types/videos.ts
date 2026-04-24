export interface Video {
    id: string;
    url: string;
    title: string;
    thumbnail: string;
    postedAt: string;
    views: number;
    premium: boolean;
    section: string;
    description?: string;
    pictures?: string[];
}
