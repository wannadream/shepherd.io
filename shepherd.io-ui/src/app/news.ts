export interface News {
    source: string;
    title: string;
    link: string;
    category: string;
    pubDate: Date;
    description: string;
    content: string;
    mediaContent: {
        url: string,
        medium: string,
        width: string,
        height: string
    };
}
