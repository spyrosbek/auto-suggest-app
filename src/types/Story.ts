export type StoryItemScope = "SEARCH" | "FAVORITES";

export interface StoryData {
    objectID: string;
    url: string;
    title: string;
    author: string;
    points?: number;
    num_comments?: number;
}

export class Story {
    id: string;
    url: string;
    title: string;
    author: string;
    points?: number;
    commentsNumber?: number;

    constructor(data: StoryData) {
        this.id = data.objectID;
        this.title = data.title;
        this.url = data.url;
        this.author = data.author;
        this.points = data.points;
        this.commentsNumber = data.num_comments;
    }
}
