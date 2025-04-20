import {User} from "./user"

export interface Post{
    id: number,
    text: string,
    total_likes: number,
    parent_id?: Post | null,
    user: User,
    replies?: number[] | null
    is_deleted: boolean;
}