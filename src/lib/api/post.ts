'use client'

import { useMutation, useQuery } from "@tanstack/react-query"

import { ApiResponse } from "@/types/api/api"
import api from "@/lib/api/index"
import useMutationToast from "@/hooks/useMutationToast"
import { showToast, SUCCESS_TOAST } from "@/app/components/Toasts/Toast"
import { Post } from "@/types/posts"

interface CreatePostForm{
    text: string,
    parent_id?: number | null
}

const postApi = {
    getAllPost: (page: number, searchQuery?: string) => api.get<ApiResponse<Post[]>>('api/post',{
        params:{
            page: page,
            per_page: 5 ,
            search: searchQuery
        }
    }), 
    postCreatePost: (data: CreatePostForm) => api.post('api/post', data),
    getIndexPost: (postId: number) => api.get(`api/post/${postId}`,{
        params:{
            per_page: 5
        }
    }) ,
    deleteDeletePost: (postId: number) => api.delete(`api/post/${postId}`),
    putEditPost: (postId: number, text: string) => api.put(`api/post/${postId}`, text),
    getUserPost: (user: string, isLiked?: boolean) => api.get(`api/user/${user}/posts`,{
        params:{
            per_page: 5,
            is_liked: isLiked
        }
    })
}

export const getAllPosts = async (page: number, searchQuery?: string) => {
    const response = await postApi.getAllPost(page, searchQuery)
    return response.data
}

export const useCreatePost = () => {
    return useMutationToast<void, CreatePostForm>(
        useMutation({
            mutationFn: async (data: CreatePostForm) => {
                const response = await postApi.postCreatePost(data)
                return response.data
            },
            onSuccess: () => {
                showToast('Post created successfully', SUCCESS_TOAST)
            }
        })
    )
}

export const useGetDetailPost = (postId: number) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: async () => {
            const response = await postApi.getIndexPost(postId)
            return response.data.data
        }
    })
}

export const useDeletePost = () => {
    return useMutationToast<void, number>(
        useMutation({
            mutationFn: async (postId: number) => {
                const response = await postApi.deleteDeletePost(postId)
                return response.data
            },
            onSuccess: () => {
                showToast('Post deleted successfully', SUCCESS_TOAST)
            }
        })
    )
}

export const useEditPost = () => {
    return useMutationToast<void, { postId: number; text: string }>(
        useMutation({
            mutationFn: async ({ postId, text }) => {
                const response = await postApi.putEditPost(postId, text)
                return response.data
            },
            onSuccess: () => {
                showToast('Post updated successfully', SUCCESS_TOAST)
            }
        })
    )
}

export const useGetUserPosts = (username: string, isLiked? : boolean) => {
    return useQuery({
        queryKey: ['userPosts', username],
        queryFn: async () => {
            const response = await postApi.getUserPost(username, isLiked)
            console.log('Get user posts, ',response)
            if (!response.data) {
                return []
            }
            return response.data
        },
        enabled: !!username
    })}

