export interface User{
    id: string,
    name: string,
    username: string,
    bio?: string | null | undefined,
    image_url?: string | undefined
}

export type WithToken ={
    token: string
}