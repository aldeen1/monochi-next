export const DEFAULT_TOAST_MEESSAGE = {
    loading: 'loading...',
    success: 'success...',
    error: (err: any):string => {
        return err?.response.data?.message ?? "something is very wrong, please... try again"
    }
}