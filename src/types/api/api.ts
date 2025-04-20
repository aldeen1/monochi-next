export type ApiResponse<T> = {
    resultMessage: string;
    resultCode: string;
    data: T | null
    meta: {
        page: number,
        per_page: number,
        max_page: number,
        count: number
    } | null
}

export type ApiError = {
    resultMessage: string;
    resultCode: string;
    data: null;
    meta: null;
}