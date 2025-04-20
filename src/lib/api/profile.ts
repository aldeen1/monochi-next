'use client'

import { useMutation, useQuery } from "@tanstack/react-query"

import api from "@/lib/api/index"
import useAuthStore from "@/store/useAuthStore"
import useMutationToast from "@/hooks/useMutationToast"
import { showToast, SUCCESS_TOAST } from "@/app/components/Toasts/Toast"
import { User } from "@/types/user"
import { ApiResponse } from "@/types/api/api"

const profileApi = {
    showUsername: (username: string) => api.get<ApiResponse<User>>(`api/user/${username}`),
    updateProfile: (data: UpdateProfileForm) => api.patch('api/user/update', data, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

export interface UpdateProfileForm extends FormData{
    name?: string,
    bio?: string,
    image?: File
}

export const useGetUsername = (username: string) => {
    return useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const response = await profileApi.showUsername(username)
            console.log(response)
            if (!response.data) {
                throw new Error('User not found')
            }
            return response.data
        },
        enabled: !!username 
    })
}

export const useUpdateProfile = () => {
    const { updateUser } = useAuthStore()

    const {
        mutateAsync: handleUpdate,
        isPending,
        isSuccess
    } = useMutationToast<User, FormData>(
            useMutation({
                mutationFn: async (data: UpdateProfileForm) => {
                    const response = await profileApi.updateProfile(data)
                    if(!response.data){
                        throw new Error('Failed to update profile')
                    }
                    updateUser(response.data)
                    return response.data
                },
                onSuccess: () => {
                    showToast("Profile updated successfully", SUCCESS_TOAST)
                }
            })
    )

    return {handleUpdate, isPending, isSuccess}
}