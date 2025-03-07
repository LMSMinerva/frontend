export type Comment = {
    id?: string;
    user: number;
    content: string;
    parent_comment: string;
    comment: string;
    comment_date: string;
    is_reply: boolean;
    replies: string;
}