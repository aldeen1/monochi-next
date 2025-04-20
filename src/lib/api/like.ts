'use client'

import { showToast, SUCCESS_TOAST } from "@/app/components/Toasts/Toast"
import useMutationToast from "@/hooks/useMutationToast"
import api from "@/lib/api/index"
import { ApiResponse } from "@/types/api/api"
import { useMutation } from "@tanstack/react-query"

const likeApi = {
    putLikePost: (postId: number) => api.put<ApiResponse<null>>(`api/likes/${postId}`),
    deleteLikePost: (postId: number) => api.delete(`api/likes/${postId}`)
}

export const usePutLikePost = () =>{
    return useMutationToast(
        useMutation({
            mutationFn: async (data: number) => {
                const response = await likeApi.putLikePost(data)
                return response
            },
            onSuccess : () => {
                showToast('Liked', SUCCESS_TOAST)
            }
        })
    )
}

export const useDeleteLikePost = () => {
    return useMutationToast(
        useMutation({
            mutationFn: async (data: number) => {
                const response = await likeApi.deleteLikePost(data)
                return response
            },
            onSuccess : () => {
                showToast('Unliked', SUCCESS_TOAST)
            }
        })
    )
}